import GameView from './game-view';
import HeaderView from './header-view';
import StatLineView from './statline-view';
import AbstractPresenter from '../utils/abstract-presenter';
import GameModel from './game-model';
import App from '../app';


export default class GamePresenter extends AbstractPresenter {
  constructor(model) {
    super();

    /** @private {GameModel} */
    this._model = model;
    this._gameView = null;
    this._headerView = null;
    this._statLineView = null;

    /** @private {?number} */
    this._timer = null;
  }

  stop() {
    clearTimeout(this._timer);
  }

  init() {
    this._nextLevel();
    this._tick();
  }

  setAnswer(isCorrect) {
    if (!isCorrect) {
      this._model.removeLife();
    }

    const time = this._model.time || 1;
    const answer = isCorrect ? time : -time;
    this._model.addAnswer(answer);
    this._model.resetTime();
    this._model.nextLevel();
    this.start();
  }

  _nextLevel() {
    if (this._model.isEnd()) {
      App.showStats(this._model.state);
      this.stop();
      return;
    }

    this._headerView = new HeaderView(this._model.state);
    this._headerView.onBackClick = () => App.showGreeting();

    this._gameView = new GameView(this._model.level, this._model.title);
    this._gameView.onFormClickHandler = (evt) => this._onFormClickHandler(evt);
    this._gameView.onFormChangeHandler = (evt) => this._onFormChangeHandler(evt);

    this._statLineView = new StatLineView(this._model.answers);

    this.addChildren(this._headerView, this._gameView, this._statLineView);
  }

  _onFormChangeHandler(evt) {
    if (this._model.gameType === GameModel.Type.THREE) {
      return;
    }

    const questions = [...this._gameView.getFormElements()];

    const checkedInputs = questions.reduce((acc, input) => {
      if (input.checked) {
        acc.push(input);
      }
      return acc;
    }, []);

    if (checkedInputs.length !== this._model.gameType) {
      return;
    }

    const isCorrectAnswer = checkedInputs.every((input, index) => {
      return this._model.level[Object.keys(this._model.level)[index]] ?
        input.value === `paint` :
        input.value === `photo`;
    });

    let target = evt.target;
    while (target.className !== this._gameView.optionClassName) {
      if (target.className === this._gameView.optionClassName) {
        isCorrectAnswer = this._model.isCorrectAnswer(target.querySelector(`img`).src);
        this.setAnswer(isCorrectAnswer);
        return;
      }
      target = target.parentNode;
    }

    this.setAnswer(isCorrectAnswer);
  }

  _onFormClickHandler(evt) {
    if (this._model.gameType !== GameModel.Type.THREE) {
      return;
    }

    let target = evt.target;
    let isCorrectAnswer = false;

    while (target !== this._gameView.form) {
      if (target.className === this._gameView.optionClassName) {
        isCorrectAnswer = this._model.isCorrectAnswer(target.querySelector(`img`).src);
        this.setAnswer(isCorrectAnswer);
        return;
      }
      target = target.parentNode;
    }
  }

  _tick() {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this._model.tick();
      this._headerView.setTime(this._model.time);
      this._tick();
    }, 1000);
  }
}
