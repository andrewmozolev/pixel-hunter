import {
  addAnswer,
  changeLevel,
  changeLives,
  changeTime,
  INITIAL_STATE,
  levels,
} from '../data/game-data';
import App from '../app';


export default class GameModel {
  constructor(playerName) {
    this._playerName = playerName;
    this._state = INITIAL_STATE;
    this._levels = levels;
  }

  get state() {
    return this._state;
  }

  get answers() {
    return this._state.answers;
  }

  get lives() {
    return this._state.lives;
  }

  get time() {
    return this._state.time;
  }

  get level() {
    return this._levels[this._state.level];
  }

  get title() {
    switch (this.gameType) {
      case GameModel.Type.ONE:
        return `Угадай, фото или рисунок?`;
      case GameModel.Type.TWO:
        return `Угадайте для каждого изображения фото или рисунок?`;
      case GameModel.Type.THREE:
        return `Найдите рисунок среди изображений`;
    }
    return ``;
  }

  get gameType() {
    return Object.keys(this.level).length;
  }

  nextLevel() {
    this._state = changeLevel(this._state, this._state.level + 1);
  }

  restart() {
    this._state = INITIAL_STATE;
  }

  tick() {
    this._state = changeTime(this._state, this._state.time + 1);
  }

  resetTime() {
    this._state = changeTime(this._state, 0);
  }

  removeLife() {
    this._state = changeLives(this._state, this._state.lives - 1);
  }

  isEnd() {
    return this.answers.length === App.SETTINGS.MAX_LEVELS ||
      this.lives === 0;
  }

  isCorrectAnswer(answer) {
    return this.level[answer];
  }

  addAnswer(time) {
    this._state = addAnswer(this.state, time);
  }
}

/** @enum {number} */
GameModel.Type = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
};
