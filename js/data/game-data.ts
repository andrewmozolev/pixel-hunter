import {Setting} from '../utils/settings';


export type StateDataType = {
  answers: Array<number>,
  question: number,
  lives: number,
  time: number,
}

export default class GameData {
  static INITIAL_STATE: StateDataType = Object.freeze({
    answers: [],
    question: 0,
    lives: Setting.MAX_LIVES,
    time: 0,
  })

  /**
   * @param {Array<number>} answers
   * @param {number} lives
   * @return {number}
   * @static
   */
  static countScores(answers, lives) {
    if (!Array.isArray(answers) ||
        answers.length !== Setting.NUMBER_OF_ANSWERS) {
      return -1;
    }

    let scores = 0;

    answers.forEach((answer) => {
      if (answer >= 0) {
        scores += Setting.SCORE_CORRECT;
      }

      if (answer >= 0 && answer < Setting.MAX_FAST_TIME) {
        scores += Setting.SCORE_FAST;
      }

      if (answer >= Setting.MIN_SLOW_TIME) {
        scores += Setting.SCORE_SLOW;
      }
    });

    scores += lives * Setting.SCORE_LIFE;

    return scores;
  }

  /**
   * @param {GameData.StateDataType} state
   * @param {number} lives
   * @return {GameData.StateDataType}
   * @static
   */
  static changeLives(state, lives) {
    if (typeof lives !== `number`) {
      return state;
    }

    if (lives < 0) {
      return Object.assign({}, state, {
        lives: 0
      });
    }

    if (lives > Setting.MAX_LIVES) {
      return Object.assign({}, state, {
        lives: Setting.MAX_LIVES
      });
    }

    return Object.assign({}, state, {
      lives
    });
  }

  /**
   * @param {GameData.StateDataType} state
   * @return {GameData.StateDataType}
   * @static
   */
  static removeLife(state) {
    return this.changeLives(state, state.lives - 1);
  }


  /**
   * @param {GameData.StateDataType} state
   * @param {number} question
   * @return {GameData.StateDataType}
   * @static
   */
  static changeQuestion(state, question) {
    if (typeof question !== `number`) {
      return state;
    }

    if (question < 0) {
      return Object.assign({}, state, {
        question: 0
      });
    }

    if (question > Setting.MAX_LEVELS) {
      return Object.assign({}, state, {
        question: Setting.MAX_LEVELS
      });
    }

    return Object.assign({}, state, {
      question
    });
  }

  /**
   * @param {GameData.StateDataType} state
   * @param {number} time
   * @return {GameData.StateDataType}
   * @static
   */
  static changeTime(state, time) {
    if (typeof time !== `number`) {
      return state;
    }

    if (time < 0) {
      return Object.assign({}, state, {
        time: 0
      });
    }

    return Object.assign({}, state, {
      time
    });
  }

  /**
   * @param {GameData.StateDataType} state
   * @param {number} answer
   * @return {GameData.StateDataType}
   * @static
   */
  static addAnswer(state, answer) {
    if (typeof answer !== `number`) {
      return state;
    }

    const answers = [...state.answers];
    answers.push(answer);

    return Object.assign({}, state, {
      answers
    });
  }

  /**
   * @param {Array<number>} answers
   * @return {number}
   * @static
   */
  static getRightAnswersAmount(answers) {
    return answers.reduce((acc, answer) => acc + +(answer > 0), 0);
  }

  /**
   * @param {Array<number>} answers
   * @return {number}
   */
  static getRightAnswersScore(answers) {
    const rightAnswersAmount = GameData.getRightAnswersAmount(answers);
    return rightAnswersAmount * Setting.SCORE_CORRECT;
  }
}
