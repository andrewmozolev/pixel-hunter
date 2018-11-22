import {assert} from 'chai';
import {countScores} from './game-data';
import {changeLives} from './game-data';
import {changeLevel} from './game-data';
import {changeTime} from './game-data';
import {INITIAL_STATE} from './game-data';

const answersTooShort = [
  {isSuccess: false, time: 5}
];

const answersTooShort2 = [
  {isSuccess: false, time: 1},
  {isSuccess: false, time: 2},
  {isSuccess: false, time: 3},
  {isSuccess: false, time: 4},
  {isSuccess: false, time: 5},
  {isSuccess: false, time: 6},
  {isSuccess: false, time: 7},
  {isSuccess: false, time: 8},
  {isSuccess: false, time: 9},
];

const answersTooLong = [
  {isSuccess: false, time: 1},
  {isSuccess: false, time: 2},
  {isSuccess: false, time: 3},
  {isSuccess: false, time: 4},
  {isSuccess: false, time: 5},
  {isSuccess: false, time: 6},
  {isSuccess: false, time: 7},
  {isSuccess: false, time: 8},
  {isSuccess: false, time: 9},
  {isSuccess: false, time: 10},
  {isSuccess: false, time: 11},
];

const answersHalfFastAndTrue = [
  {isSuccess: false, time: 25},
  {isSuccess: false, time: 25},
  {isSuccess: false, time: 25},
  {isSuccess: false, time: 25},
  {isSuccess: false, time: 25},
  {isSuccess: true, time: 5},
  {isSuccess: true, time: 5},
  {isSuccess: true, time: 5},
  {isSuccess: true, time: 5},
  {isSuccess: true, time: 5}
];

const answersAverageSpeedAndTrue = [
  {isSuccess: true, time: 15},
  {isSuccess: true, time: 15},
  {isSuccess: true, time: 15},
  {isSuccess: true, time: 15},
  {isSuccess: true, time: 15},
  {isSuccess: true, time: 15},
  {isSuccess: true, time: 15},
  {isSuccess: true, time: 15},
  {isSuccess: true, time: 15},
  {isSuccess: true, time: 15}
];

const answersFastAndFalse = [
  {isSuccess: false, time: 5},
  {isSuccess: false, time: 5},
  {isSuccess: false, time: 5},
  {isSuccess: false, time: 5},
  {isSuccess: false, time: 5},
  {isSuccess: false, time: 5},
  {isSuccess: false, time: 5},
  {isSuccess: false, time: 5},
  {isSuccess: false, time: 5},
  {isSuccess: false, time: 5}
];

const answersSlowAndFalse = [
  {isSuccess: false, time: 25},
  {isSuccess: false, time: 25},
  {isSuccess: false, time: 25},
  {isSuccess: false, time: 25},
  {isSuccess: false, time: 25},
  {isSuccess: false, time: 25},
  {isSuccess: false, time: 25},
  {isSuccess: false, time: 25},
  {isSuccess: false, time: 25},
  {isSuccess: false, time: 25}
];

const answersSlowAndTrue = [
  {isSuccess: true, time: 25},
  {isSuccess: true, time: 25},
  {isSuccess: true, time: 25},
  {isSuccess: true, time: 25},
  {isSuccess: true, time: 25},
  {isSuccess: true, time: 25},
  {isSuccess: true, time: 25},
  {isSuccess: true, time: 25},
  {isSuccess: true, time: 25},
  {isSuccess: true, time: 25}
];

describe(`countScores`, () => {
  it(`Valid score.`, () => {
    assert.equal(countScores(answersHalfFastAndTrue, 0), 500);
    assert.equal(countScores(answersAverageSpeedAndTrue, 3), 1150);
    assert.equal(countScores(answersFastAndFalse, 1), 550);
    assert.equal(countScores(answersSlowAndFalse, 1), -450);
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
