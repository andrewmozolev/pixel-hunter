export const INITIAL_STATE = Object.freeze({
  answers: [],
  level: 0,
  lives: 3,
  time: 0,
});

const ScoreName = {
  FAST: `fast`,
  LIFE: `life`,
  RIGHT_ANSWER: `right_answer`,
  SLOW: `slow`,
};

const SCORES = {
  [ScoreName.FAST]: 50,
  [ScoreName.LIFE]: 50,
  [ScoreName.RIGHT_ANSWER]: 100,
  [ScoreName.SLOW]: -50,
};

const MAX_LIVES = 3;
const MAX_LEVELS = 10;
const MAX_FAST_TIME = 10;
const MIN_SLOW_TIME = 20;
const NUMBER_OF_ANSWERS = 10;

export const countScores = (answers, lives) => {
  if (!Array.isArray(answers) || answers.length !== NUMBER_OF_ANSWERS) {
    return -1;
  }

  let scores = 0;

  answers.forEach((answer) => {
    if (answer.isSuccess) {
      scores += SCORES[ScoreName.RIGHT_ANSWER];
    }

    if (answer.time < MAX_FAST_TIME) {
      scores += SCORES[ScoreName.FAST];
    }

    if (answer.time >= MIN_SLOW_TIME) {
      scores += SCORES[ScoreName.SLOW];
    }
  });

  scores += lives * SCORES[ScoreName.LIFE];

  return scores;
};

export const changeLives = (state, lives) => {
  if (typeof lives !== `number`) {
    return state;
  }

  if (lives < 0) {
    return Object.assign({}, state, {
      lives: 0
    });
  }

  if (lives > MAX_LIVES) {
    return Object.assign({}, state, {
      lives: MAX_LIVES
    });
  }

  return Object.assign({}, state, {
    lives
  });
};

export const changeLevel = (state, level) => {
  if (typeof level !== `number`) {
    return state;
  }

  if (level < 0) {
    return Object.assign({}, state, {
      level: 0
    });
  }

  if (level > MAX_LEVELS) {
    return Object.assign({}, state, {
      level: MAX_LEVELS
    });
  }

  return Object.assign({}, state, {
    level
  });
};

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
