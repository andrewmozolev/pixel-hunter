import AbstractPresenter from '../utils/abstract-presenter';
import App from '../app';
import GameView, {GameViewClassName} from './game-view';
import HeaderView from './header-view';
import Question, {QuestionType} from '../data/question';
import StatLineView from './statline-view';
import {Setting} from '../utils/settings';
import GameModel from './game-model';


export default class GamePresenter extends AbstractPresenter {
  private _model: GameModel;
  private _gameView: GameView;
  private _headerView: HeaderView;
  private _statLineView: StatLineView;
  private _timer: number | null;

  constructor(model: GameModel) {
    super();

    this._model = model;
  }

  public init() {
    if (this._model.isEnd()) {
      App.showStats(this._model.state, this._model.username);
      this._stop();
      return;
    }

    this._nextQuestion();
    this._tick();
  }

  private _stop() {
    if (typeof this._timer === `number`) {
      clearTimeout(this._timer);
    }
    this._timer = null;
  }

  private _setAnswer(isCorrect: boolean) {
    if (!isCorrect) {
      this._model.removeLife();
    }

    this._stop();
    const time = this._model.time || 1;
    const answer = isCorrect ? time : -time;
    this._model.addAnswer(answer);
    this._model.resetTime();
    this._model.nextQuestion();
    this.init();
  }

  private _nextQuestion() {
    this._headerView = new HeaderView(this._model.state);
    this._headerView.onBackClick = () => App.showGreeting();

    this._gameView = new GameView(this._model.question,
        this._model.getCorrectType());
    this._gameView.onFormClickHandler = (evt) => this._onFormClickHandler(evt);
    this._gameView.onFormChangeHandler = () => this._onFormChangeHandler();

    this._statLineView = new StatLineView(this._model.answers);

    this.addChildren(this._headerView, this._gameView, this._statLineView);
  }

  private _onFormChangeHandler() {
    if (this._model.gameType === QuestionType.ONE_OF_THREE) {
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
  private _onFormClickHandler(evt: Event) {
    const formEl = <HTMLFormElement> evt.target;
    if (this._model.gameType !== QuestionType.ONE_OF_THREE ||
        formEl.className !== GameViewClassName.GAME_IMAGE) {
      return;
    }

    const isCorrectAnswer =
        this._model.isCorrectAnswer(formEl.src, this._model.getCorrectType());

    this._setAnswer(isCorrectAnswer);
  }

  private _tick() {
    if (typeof this._timer === `number`) {
      clearTimeout(this._timer);
    }
    this._timer = window.setTimeout(() => {
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
