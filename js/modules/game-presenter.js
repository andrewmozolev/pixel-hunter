import AbstractPresenter from '../utils/abstract-presenter';
import App from '../app';
import GameView from './game-view';
import HeaderView from './header-view';
import Question from '../data/question';
import StatLineView from './statline-view';
import {Setting} from '../utils/settings';


export default class GamePresenter extends AbstractPresenter {
  /**
   * @param {GameModel} model
   * @param {string} username
   */
  constructor(model) {
    super();

    /** @private {GameModel} */
    this._model = model;

    /** @private {GameView} */
    this._gameView = null;

    /** @private {HeaderView} */
    this._headerView = null;

    /** @private {StatLineView} */
    this._statLineView = null;

    /** @private {?number} */
    this._timer = null;
  }

  stop() {
    clearTimeout(this._timer);
    this._timer = null;
  }

  init() {
    if (this._model.isEnd()) {
      App.showStats(this._model.state, this._model.username);
      this.stop();
      return;
    }

    this._nextQuestion();
    this._tick();
  }

  /**
   * @param {boolean} isCorrect
   * @private
   */
  _setAnswer(isCorrect) {
    if (!isCorrect) {
      this._model.removeLife();
    }

    this.stop();
    const time = this._model.time || 1;
    const answer = isCorrect ? time : -time;
    this._model.addAnswer(answer);
    this._model.resetTime();
    this._model.nextQuestion();
    this.init();
  }

  /** @private */
  _nextQuestion() {
    this._headerView = new HeaderView(this._model.state);
    this._headerView.onBackClick = () => App.showGreeting();

    this._gameView = new GameView(this._model.question,
        this._model.getCorrectType());
    this._gameView.onFormClickHandler = (evt) => this._onFormClickHandler(evt);
    this._gameView.onFormChangeHandler = () => this._onFormChangeHandler();

    this._statLineView = new StatLineView(this._model.answers);

    this.addChildren(this._headerView, this._gameView, this._statLineView);
  }

  /** @private */
  _onFormChangeHandler() {
    if (this._model.gameType === Question.Type.ONE_OF_THREE) {
      return;
    }

    const inputs = this._gameView.getInputsElements();
    const options = this._gameView.getOptionsElements();

    const numberOfCheckedInputs =
        inputs.filter((input) => input.checked).length;

    if (numberOfCheckedInputs !== options.length) {
      return;
    }

    const isCorrectAnswer = options.every((option, index) => {
      const image = this._gameView.getPreciseImage(index);
      const checkedInput = this._gameView.getPreciseImageCheckedInput(index);
      return this._model.isCorrectAnswer(image.src, checkedInput.value);
    });

    this._setAnswer(isCorrectAnswer);
  }

  /**
   * @param {Event} param
   * @param {HTMLElement} param.target
   * @private
   */
  _onFormClickHandler({target}) {
    if (this._model.gameType !== Question.Type.ONE_OF_THREE ||
        target.className !== GameView.ClassName.GAME_IMAGE) {
      return;
    }

    const isCorrectAnswer =
        this._model.isCorrectAnswer(target.src, this._model.getCorrectType());

    this._setAnswer(isCorrectAnswer);
  }

  _tick() {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this._model.tick();

      if (this._model.time > Setting.MAX_TIME_FOR_ANSWER) {
        this._setAnswer(false);
        return;
      }

      if (this._model.time >= Setting.MAX_TIME_FOR_ANSWER -
          Setting.WARN_GAP_TIME) {
        this._headerView.setTimeWarnAnimation();
      }

      this._headerView.setTime(this._model.time);
      this._tick();
    }, 1000);
  }
}
