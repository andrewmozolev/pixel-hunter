import GameData, {StateDataType} from '../data/game-data';
import Option, {OptionType} from '../data/option';
import {Setting} from '../utils/settings';
import Question from "../data/question";


export default class GameModel {
  readonly _questions: Array<Question>;
  readonly _username: string;
  private _state: StateDataType;

  constructor(questions: Array<Question>, username: string) {
    this._questions = questions;

    this._username = username;

    this._state = GameData.INITIAL_STATE;
  }

  get state(): StateDataType {
    return this._state;
  }

  get username(): string {
    return this._username;
  }

  get answers(): Array<number> {
    return this._state.answers;
  }

  get lives(): number {
    return this._state.lives;
  }

  get time(): number {
    return this._state.time;
  }

  get question(): Question {
    return this._questions[this._state.question];
  }

  get options(): Array<Option> {
    return this.question.options;
  }

  get title(): string {
    return this.question.title;
  }

  get gameType(): string {
    return this.question ? this.question.type : ``;
  }

  public nextQuestion() {
    this._state = GameData.changeQuestion(this._state, this._state.question + 1);
  }

  public restart() {
    this._state = GameData.INITIAL_STATE;
  }

  public tick() {
    this._state = GameData.changeTime(this._state, this._state.time + 1);
  }

  public resetTime() {
    this._state = GameData.changeTime(this._state, 0);
  }

  public removeLife() {
    this._state = GameData.changeLives(this._state, this._state.lives - 1);
  }

  public isEnd(): boolean {
    return this.answers.length === Setting.MAX_LEVELS ||
      this.lives === 0;
  }

  public getCorrectType(): string {
    const photoCount = this.options.reduce((acc, option) => {
      return acc + (option.type === OptionType.PHOTO ? 1 : 0);
    }, 0);
    return photoCount === 1 ? OptionType.PHOTO : OptionType.PAINTING;
  }

  public isCorrectAnswer(src: string, answer: string): boolean {
    const option = this._getOptionByUrl(src);
    return option.type === answer;
  }

  public addAnswer(time: number) {
    this._state = GameData.addAnswer(this.state, time);
  }

  private _getOptionByUrl(url: string): Option {
    return <Option> this.options.find((option) => option.image.url === url);
  }
}
