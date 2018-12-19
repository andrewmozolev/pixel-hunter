import App from '../app';
import GameData from '../data/game-data';
import Option from '../data/option';


export default class GameModel {
  constructor(questions, playerName) {
    this._playerName = playerName;
    this._state = GameData.INITIAL_STATE;
    this._questions = questions;
  }

  get state() {
    return this._state;
  }

  /** @return {Array<number>} */
  get answers() {
    return this._state.answers;
  }

  /** @return {number} */
  get lives() {
    return this._state.lives;
  }

  /** @return {number} */
  get time() {
    return this._state.time;
  }

  /** @return {Question} */
  get question() {
    return this._questions[this._state.question];
  }

  /** @return {Array<Option>} */
  get options() {
    return this.question.options;
  }

  /** @return {string} */
  get title() {
    return this.question.title;
  }

  /** @return {string} */
  get gameType() {
    return this.question.type;
  }

  nextQuestion() {
    this._state = GameData.changeQuestion(this._state, this._state.question + 1);
  }

  restart() {
    this._state = GameData.INITIAL_STATE;
  }

  tick() {
    this._state = GameData.changeTime(this._state, this._state.time + 1);
  }

  resetTime() {
    this._state = GameData.changeTime(this._state, 0);
  }

  removeLife() {
    this._state = GameData.changeLives(this._state, this._state.lives - 1);
  }

  /** @return {boolean} */
  isEnd() {
    return this.answers.length === App.SETTINGS.MAX_LEVELS ||
      this.lives === 0;
  }

  /** @return {string} */
  getCorrectType() {
    const photoCount = this.options.reduce((acc, option) => {
      return acc + (option.type === Option.Type.PHOTO ? 1 : 0);
    }, 0);
    return photoCount === 1 ? Option.Type.PHOTO : Option.Type.PAINTING;
  }

  /**
   * @param {string} src
   * @param {string} answer
   * @return {boolean}
   */
  isCorrectAnswer(src, answer) {
    const option = this._getOptionByUrl(src);
    return option.type === answer;
  }

  /** @param {number} time */
  addAnswer(time) {
    this._state = GameData.addAnswer(this.state, time);
  }

  /**
   * @param {string} url
   * @return {Option}
   * @private
   */
  _getOptionByUrl(url) {
    return this.options.find((option) => option.image.url === url);
  }
}
