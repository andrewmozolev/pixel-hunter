import AbstractView from '../utils/abstract-view';
import Utils from '../utils/utils';
import {Setting} from '../utils/settings';


export default class StatLineView extends AbstractView {
  private _answers: any
  constructor(answers) {
    super();

    this._answers = answers;
  }

  static get AnswerType() {
    return {
      CORRECT: `correct`,
      FAST: `fast`,
      SLOW: `slow`,
      UNKNOWN: `unknown`,
      WRONG: `wrong`,
    };
  }

  get template(): string {
    return `
    <ul class="stats">
      ${this._answers.map((answer) => `<li class="${this._getAnswerClassName(answer)}"></li>`).join(``)}
      ${new Array(Setting.MAX_LEVELS - this._answers.length).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
    </ul>`;
  }

  private _getAnswerType(answer) {
    if (answer < 0) {
      return StatLineView.AnswerType.WRONG;
    }

    if (answer < Setting.MAX_FAST_TIME) {
      return StatLineView.AnswerType.FAST;
    }

    if (answer >= Setting.MIN_SLOW_TIME) {
      return StatLineView.AnswerType.SLOW;
    }

    return StatLineView.AnswerType.CORRECT;
  }

  private _getAnswerClassName(answer) {
    const answerType = this._getAnswerType(answer);
    return Utils.className(`stats__result`,
        answerType === StatLineView.AnswerType.CORRECT, StatLineView.AnswerType.CORRECT,
        answerType === StatLineView.AnswerType.FAST, StatLineView.AnswerType.FAST,
        answerType === StatLineView.AnswerType.SLOW, StatLineView.AnswerType.SLOW,
        answerType === StatLineView.AnswerType.WRONG, StatLineView.AnswerType.WRONG);
  }
}
