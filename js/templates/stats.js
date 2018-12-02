import {className} from '../utils';
import {SETTINGS} from '../data/game-data';


/** @enum {string} */
const AnswerType = {
  CORRECT: `correct`,
  FAST: `fast`,
  SLOW: `slow`,
  UNKNOWN: `unknown`,
  WRONG: `wrong`,
};

const getAnswerType = (answer) => {
  if (answer < 0) {
    return AnswerType.WRONG;
  }

  if (answer < SETTINGS.MAX_FAST_TIME) {
    return AnswerType.FAST;
  }

  if (answer >= SETTINGS.MIN_SLOW_TIME) {
    return AnswerType.SLOW;
  }

  return AnswerType.CORRECT;
};

export default (answers) => `
    <ul class="stats">
      ${answers.map((answer) => {
    const answerType = getAnswerType(answer);
    const statusClassName = className(`stats__result`,
        answerType === AnswerType.CORRECT, AnswerType.CORRECT,
        answerType === AnswerType.FAST, AnswerType.FAST,
        answerType === AnswerType.SLOW, AnswerType.SLOW,
        answerType === AnswerType.WRONG, AnswerType.WRONG);
    return `<li class="${statusClassName}"></li>`;
  }).join(``)}
      ${new Array(SETTINGS.MAX_LEVELS - answers.length).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
      
    </ul>`;
