import App from '../app';


export default class GameData {
  /**
   * @param {Array<number>} answers
   * @param {number} lives
   * @static
   * @return {number}
   */
  static countScores(answers, lives) {
    if (!Array.isArray(answers) || answers.length !== App.SETTINGS.NUMBER_OF_ANSWERS) {
      return -1;
    }

    let scores = 0;

    answers.forEach((answer) => {
      if (answer >= 0) {
        scores += App.SETTINGS.SCORE_CORRECT;
      }

      if (answer >= 0 && answer < App.SETTINGS.MAX_FAST_TIME) {
        scores += App.SETTINGS.SCORE_FAST;
      }

      if (answer >= 0 && answer >= App.SETTINGS.MIN_SLOW_TIME) {
        scores += App.SETTINGS.SCORE_SLOW;
      }
    });

    scores += lives * App.SETTINGS.SCORE_LIFE;

    return scores;
  }

  /**
   * @param {GameData.StateDataType} state
   * @param {number} lives
   * @public
   * @return {GameData.StateDataType}
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

    if (lives > App.SETTINGS.MAX_LIVES) {
      return Object.assign({}, state, {
        lives: App.SETTINGS.MAX_LIVES
      });
    }

    return Object.assign({}, state, {
      lives
    });
  }

  /**
   * @param {GameData.StateDataType} state
   * @public
   * @return {GameData.StateDataType}
   */
  static removeLife(state) {
    return this.changeLives(state, state.lives - 1);
  }


  /**
   * @param {GameData.StateDataType} state
   * @param {number} question
   * @static
   * @return {GameData.StateDataType}
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

    if (question > App.SETTINGS.MAX_LEVELS) {
      return Object.assign({}, state, {
        question: App.SETTINGS.MAX_LEVELS
      });
    }

    return Object.assign({}, state, {
      question
    });
  }

  /**
   * @param {GameData.StateDataType} state
   * @param {number} time
   * @static
   * @return {GameData.StateDataType}
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
   * @static
   * @return {GameData.StateDataType}
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
}

/**
 * @typedef {{
 *   answers: Array<number>,
 *   question: number,
 *   lives: number,
 *   time: number,
 * }}
 */
GameData.StateDataType;

/**
 * @const {GameData.StateDataType}
 * @readonly
 */
GameData.INITIAL_STATE = Object.freeze({
  answers: [],
  question: 0,
  lives: 3,
  time: 0,
});
