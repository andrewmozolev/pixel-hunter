import App from '../app';


/**
 * @const {StateDataType}
 * @readonly
 */
export const INITIAL_STATE = Object.freeze({
  answers: [],
  level: 0,
  lives: 3,
  time: 0,
});

/**
 * @typedef {{
 *   answers: Array<number>,
 *   level: number,
 *   lives: number,
 *   time: number,
 * }}
 */
StateDataType;

/** @const {Array<LevelDataType>} */
export const levels = [
  {
    'http://i.imgur.com/DKR1HtB.jpg': false,
    'https://k32.kn3.net/5C7060EC5.jpg': true,
    'https://i.imgur.com/DiHM5Zb.jpg': false
  }, {
    'https://k42.kn3.net/CF42609C8.jpg': true
  }, {
    'https://k42.kn3.net/D2F0370D6.jpg': true,
    'http://i.imgur.com/1KegWPz.jpg': false
  }, {
    'https://k32.kn3.net/5C7060EC5.jpg': true,
    'https://i.imgur.com/DiHM5Zb.jpg': false,
    'http://i.imgur.com/DKR1HtB.jpg': false
  }, {
    'https://k42.kn3.net/D2F0370D6.jpg': true
  }, {
    'https://k32.kn3.net/5C7060EC5.jpg': true
  }, {
    'https://k32.kn3.net/5C7060EC5.jpg': true,
    'http://i.imgur.com/1KegWPz.jpg': false
  }, {
    'http://i.imgur.com/1KegWPz.jpg': false
  }, {
    'https://k32.kn3.net/5C7060EC5.jpg': true,
    'http://i.imgur.com/1KegWPz.jpg': false,
    'http://i.imgur.com/DKR1HtB.jpg': false
  }, {
    'http://i.imgur.com/1KegWPz.jpg': false,
    'https://k42.kn3.net/D2F0370D6.jpg': true
  }
];

/** @typedef {Object<string, boolean>} */
LevelDataType;

/**
 * @param {Array<number>} answers
 * @param {number} lives
 * @public
 * @return {number}
 */
export const countScores = (answers, lives) => {
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
};

/**
 * @param {StateDataType} state
 * @param {number} lives
 * @public
 * @return {StateDataType}
 */
export const changeLives = (state, lives) => {
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
};

/**
 * @param {StateDataType} state
 * @public
 * @return {StateDataType}
 */
export const removeLife = (state) => changeLives(state, state.lives - 1);

/**
 * @param {StateDataType} state
 * @param {number} level
 * @public
 * @return {StateDataType}
 */
export const changeLevel = (state, level) => {
  if (typeof level !== `number`) {
    return state;
  }

  if (level < 0) {
    return Object.assign({}, state, {
      level: 0
    });
  }

  if (level > App.SETTINGS.MAX_LEVELS) {
    return Object.assign({}, state, {
      level: App.SETTINGS.MAX_LEVELS
    });
  }

  return Object.assign({}, state, {
    level
  });
};

/**
 * @param {StateDataType} state
 * @public
 * @return {StateDataType}
 */
export const nextLevel = (state) => changeLevel(state, state.level + 1);

/**
 * @param {StateDataType} state
 * @param {number} time
 * @public
 * @return {StateDataType}
 */
export const changeTime = (state, time) => {
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
};


/**
 * @param {StateDataType} state
 * @param {number} answer
 * @public
 * @return {StateDataType}
 */
export const addAnswer = (state, answer) => {
  if (typeof answer !== `number`) {
    return state;
  }

  const answers = [...state.answers];
  answers.push(answer);

  return Object.assign({}, state, {
    answers
  });
};
