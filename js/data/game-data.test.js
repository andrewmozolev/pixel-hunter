import {assert} from 'chai';
import {countScores} from './game-data';
import {changeLives} from './game-data';
import {changeLevel} from './game-data';
import {changeTime} from './game-data';
import {addAnswer} from './game-data';
import {INITIAL_STATE} from './game-data';


const answersTooShort = [-5];

const answersTooShort2 = [-1, -2, -3, -4, -5, -6, -7, -8, -9];

const answersTooLong = [-1, 2, -3, -4, -5, 6, -7, -8, -9, 10, -11, 12, -13, -14, 15];

const answersHalfFastAndTrue = [-25, -25, -25, -25, -25, 5, 5, 5, 5, 5];

const answersAverageSpeedAndTrue = [15, 15, 15, 15, 15, 15, 15, 15, 15, 15];

const answersFastAndFalse = [-5, -5, -5, -5, -5, -5, -5, -5, -5, -5];

const answersSlowAndFalse = [-25, -25, -25, -25, -25, -25, -25, -25, -25, -25];

const answersSlowAndTrue = [25, 25, 25, 25, 25, 25, 25, 25, 25, 25];

describe(`countScores`, () => {
  it(`Valid score.`, () => {
    assert.equal(countScores(answersHalfFastAndTrue, 0), 750);
    assert.equal(countScores(answersAverageSpeedAndTrue, 3), 1150);
    assert.equal(countScores(answersFastAndFalse, 1), 50);
    assert.equal(countScores(answersSlowAndFalse, 1), 50);
    assert.equal(countScores(answersSlowAndTrue, 1), 550);
  });

  it(`Invalid score.`, () => {
    assert.equal(countScores(answersTooShort, 1), -1);
    assert.equal(countScores(answersTooShort2, 1), -1);
    assert.equal(countScores(answersTooLong, 1), -1);
  });

  it(`Invalid data.`, () => {
    assert.equal(countScores([], undefined), -1);
    assert.equal(countScores([], `1`), -1);
    assert.equal(countScores([], null), -1);
    assert.equal(countScores([], true), -1);
    assert.equal(countScores([], []), -1);
    assert.equal(countScores([], {}), -1);
    assert.equal(countScores(``, 1), -1);
    assert.equal(countScores({}, 1), -1);
    assert.equal(countScores(null, 1), -1);
    assert.equal(countScores(undefined, 1), -1);
    assert.equal(countScores(1, 1), -1);
  });
});

describe(`changeLives`, () => {
  it(`Valid score.`, () => {
    assert.equal(changeLives(INITIAL_STATE, 0).lives, 0);
    assert.equal(changeLives(INITIAL_STATE, 1).lives, 1);
    assert.equal(changeLives(INITIAL_STATE, 3).lives, 3);

  });

  it(`Invalid score.`, () => {
    assert.equal(changeLives(INITIAL_STATE, 4).lives, 3);
    assert.equal(changeLives(INITIAL_STATE, -1).lives, 0);
    assert.equal(changeLives(INITIAL_STATE, -100).lives, 0);
    assert.equal(changeLives(INITIAL_STATE, 10).lives, 3);
    assert.equal(changeLives(INITIAL_STATE, 100).lives, 3);
  });

  it(`Invalid data.`, () => {
    assert.equal(changeLives(INITIAL_STATE, null).lives, INITIAL_STATE.lives);
    assert.equal(changeLives(INITIAL_STATE, undefined).lives, INITIAL_STATE.lives);
    assert.equal(changeLives(INITIAL_STATE, true).lives, INITIAL_STATE.lives);
    assert.equal(changeLives(INITIAL_STATE, []).lives, INITIAL_STATE.lives);
    assert.equal(changeLives(INITIAL_STATE, {}).lives, INITIAL_STATE.lives);
  });
});

describe(`changeLevel`, () => {
  it(`Valid score.`, () => {
    assert.equal(changeLevel(INITIAL_STATE, 0).level, 0);
    assert.equal(changeLevel(INITIAL_STATE, 1).level, 1);
    assert.equal(changeLevel(INITIAL_STATE, 3).level, 3);
    assert.equal(changeLevel(INITIAL_STATE, 10).level, 10);
  });

  it(`Invalid score.`, () => {
    assert.equal(changeLevel(INITIAL_STATE, -1).level, 0);
    assert.equal(changeLevel(INITIAL_STATE, -100).level, 0);
    assert.equal(changeLevel(INITIAL_STATE, 11).level, 10);
    assert.equal(changeLevel(INITIAL_STATE, 100).level, 10);
  });

  it(`Invalid data.`, () => {
    assert.equal(changeLevel(INITIAL_STATE, null).level, INITIAL_STATE.level);
    assert.equal(changeLevel(INITIAL_STATE, undefined).level, INITIAL_STATE.level);
    assert.equal(changeLevel(INITIAL_STATE, true).level, INITIAL_STATE.level);
    assert.equal(changeLevel(INITIAL_STATE, []).level, INITIAL_STATE.level);
    assert.equal(changeLevel(INITIAL_STATE, {}).level, INITIAL_STATE.level);
  });
});

describe(`changeTime`, () => {
  it(`Valid score.`, () => {
    assert.equal(changeTime(INITIAL_STATE, 0).time, 0);
    assert.equal(changeTime(INITIAL_STATE, 1).time, 1);
    assert.equal(changeTime(INITIAL_STATE, 3).time, 3);
    assert.equal(changeTime(INITIAL_STATE, 10).time, 10);
  });

  it(`Invalid score.`, () => {
    assert.equal(changeTime(INITIAL_STATE, -1).time, 0);
    assert.equal(changeTime(INITIAL_STATE, -100).time, 0);
    assert.equal(changeTime(INITIAL_STATE, 11).time, 11);
    assert.equal(changeTime(INITIAL_STATE, 100).time, 100);
    assert.equal(changeTime(INITIAL_STATE, 99999).time, 99999);
  });

  it(`Invalid data.`, () => {
    assert.equal(changeTime(INITIAL_STATE, null).time, INITIAL_STATE.time);
    assert.equal(changeTime(INITIAL_STATE, undefined).time, INITIAL_STATE.time);
    assert.equal(changeTime(INITIAL_STATE, true).time, INITIAL_STATE.time);
    assert.equal(changeTime(INITIAL_STATE, []).time, INITIAL_STATE.time);
    assert.equal(changeTime(INITIAL_STATE, {}).time, INITIAL_STATE.time);
  });
});

describe(`addAnswer`, () => {
  it(`Valid score.`, () => {
    assert.deepEqual(addAnswer(INITIAL_STATE, 5).answers, [5]);
    assert.deepEqual(addAnswer(INITIAL_STATE, 15).answers, [15]);
    assert.deepEqual(addAnswer(INITIAL_STATE, 25).answers, [25]);
    assert.deepEqual(addAnswer(INITIAL_STATE, -25).answers, [-25]);
  });

  it(`Invalid score.`, () => {
    assert.deepEqual(addAnswer(INITIAL_STATE, ``).answers, []);
    assert.deepEqual(addAnswer(INITIAL_STATE, `some text`).answers, []);
  });

  it(`Invalid data.`, () => {
    assert.deepEqual(addAnswer(INITIAL_STATE, null).answers, []);
    assert.deepEqual(addAnswer(INITIAL_STATE, undefined).answers, []);
    assert.deepEqual(addAnswer(INITIAL_STATE, true).answers, []);
    assert.deepEqual(addAnswer(INITIAL_STATE, {}).answers, []);
  });
});
