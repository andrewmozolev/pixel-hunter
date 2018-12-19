import {assert} from 'chai';
import GameData from './game-data';


const answersTooShort = [-5];

const answersTooShort2 = [-1, -2, -3, -4, -5, -6, -7, -8, -9];

const answersTooLong = [-1, 2, -3, -4, -5, 6, -7, -8, -9, 10, -11, 12, -13, -14, 15];

const answersHalfFastAndTrue = [-25, -25, -25, -25, -25, 5, 5, 5, 5, 5];

const answersAverageSpeedAndTrue = [15, 15, 15, 15, 15, 15, 15, 15, 15, 15];

const answersFastAndFalse = [-5, -5, -5, -5, -5, -5, -5, -5, -5, -5];

const answersSlowAndFalse = [-25, -25, -25, -25, -25, -25, -25, -25, -25, -25];

const answersSlowAndTrue = [25, 25, 25, 25, 25, 25, 25, 25, 25, 25];

describe(`GameData.countScores`, () => {
  it(`Valid score.`, () => {
    assert.equal(GameData.countScores(answersHalfFastAndTrue, 0), 750);
    assert.equal(GameData.countScores(answersAverageSpeedAndTrue, 3), 1150);
    assert.equal(GameData.countScores(answersFastAndFalse, 1), 50);
    assert.equal(GameData.countScores(answersSlowAndFalse, 1), 50);
    assert.equal(GameData.countScores(answersSlowAndTrue, 1), 550);
  });

  it(`Invalid score.`, () => {
    assert.equal(GameData.countScores(answersTooShort, 1), -1);
    assert.equal(GameData.countScores(answersTooShort2, 1), -1);
    assert.equal(GameData.countScores(answersTooLong, 1), -1);
  });

  it(`Invalid data.`, () => {
    assert.equal(GameData.countScores([], undefined), -1);
    assert.equal(GameData.countScores([], `1`), -1);
    assert.equal(GameData.countScores([], null), -1);
    assert.equal(GameData.countScores([], true), -1);
    assert.equal(GameData.countScores([], []), -1);
    assert.equal(GameData.countScores([], {}), -1);
    assert.equal(GameData.countScores(``, 1), -1);
    assert.equal(GameData.countScores({}, 1), -1);
    assert.equal(GameData.countScores(null, 1), -1);
    assert.equal(GameData.countScores(undefined, 1), -1);
    assert.equal(GameData.countScores(1, 1), -1);
  });
});

describe(`GameData.changeLives`, () => {
  it(`Valid score.`, () => {
    assert.equal(GameData.changeLives(GameData.INITIAL_STATE, 0).lives, 0);
    assert.equal(GameData.changeLives(GameData.INITIAL_STATE, 1).lives, 1);
    assert.equal(GameData.changeLives(GameData.INITIAL_STATE, 3).lives, 3);

  });

  it(`Invalid score.`, () => {
    assert.equal(GameData.changeLives(GameData.INITIAL_STATE, 4).lives, 3);
    assert.equal(GameData.changeLives(GameData.INITIAL_STATE, -1).lives, 0);
    assert.equal(GameData.changeLives(GameData.INITIAL_STATE, -100).lives, 0);
    assert.equal(GameData.changeLives(GameData.INITIAL_STATE, 10).lives, 3);
    assert.equal(GameData.changeLives(GameData.INITIAL_STATE, 100).lives, 3);
  });

  it(`Invalid data.`, () => {
    assert.equal(GameData.changeLives(GameData.INITIAL_STATE, null).lives, GameData.INITIAL_STATE.lives);
    assert.equal(GameData.changeLives(GameData.INITIAL_STATE, undefined).lives, GameData.INITIAL_STATE.lives);
    assert.equal(GameData.changeLives(GameData.INITIAL_STATE, true).lives, GameData.INITIAL_STATE.lives);
    assert.equal(GameData.changeLives(GameData.INITIAL_STATE, []).lives, GameData.INITIAL_STATE.lives);
    assert.equal(GameData.changeLives(GameData.INITIAL_STATE, {}).lives, GameData.INITIAL_STATE.lives);
  });
});

describe(`GameData.changeQuestion`, () => {
  it(`Valid score.`, () => {
    assert.equal(GameData.changeQuestion(GameData.INITIAL_STATE, 0).question, 0);
    assert.equal(GameData.changeQuestion(GameData.INITIAL_STATE, 1).question, 1);
    assert.equal(GameData.changeQuestion(GameData.INITIAL_STATE, 3).question, 3);
    assert.equal(GameData.changeQuestion(GameData.INITIAL_STATE, 10).question, 10);
  });

  it(`Invalid score.`, () => {
    assert.equal(GameData.changeQuestion(GameData.INITIAL_STATE, -1).question, 0);
    assert.equal(GameData.changeQuestion(GameData.INITIAL_STATE, -100).question, 0);
    assert.equal(GameData.changeQuestion(GameData.INITIAL_STATE, 11).question, 10);
    assert.equal(GameData.changeQuestion(GameData.INITIAL_STATE, 100).question, 10);
  });

  it(`Invalid data.`, () => {
    assert.equal(GameData.changeQuestion(GameData.INITIAL_STATE, null).question, GameData.INITIAL_STATE.question);
    assert.equal(GameData.changeQuestion(GameData.INITIAL_STATE, undefined).question, GameData.INITIAL_STATE.question);
    assert.equal(GameData.changeQuestion(GameData.INITIAL_STATE, true).question, GameData.INITIAL_STATE.question);
    assert.equal(GameData.changeQuestion(GameData.INITIAL_STATE, []).question, GameData.INITIAL_STATE.question);
    assert.equal(GameData.changeQuestion(GameData.INITIAL_STATE, {}).question, GameData.INITIAL_STATE.question);
  });
});

describe(`GameData.changeTime`, () => {
  it(`Valid score.`, () => {
    assert.equal(GameData.changeTime(GameData.INITIAL_STATE, 0).time, 0);
    assert.equal(GameData.changeTime(GameData.INITIAL_STATE, 1).time, 1);
    assert.equal(GameData.changeTime(GameData.INITIAL_STATE, 3).time, 3);
    assert.equal(GameData.changeTime(GameData.INITIAL_STATE, 10).time, 10);
  });

  it(`Invalid score.`, () => {
    assert.equal(GameData.changeTime(GameData.INITIAL_STATE, -1).time, 0);
    assert.equal(GameData.changeTime(GameData.INITIAL_STATE, -100).time, 0);
    assert.equal(GameData.changeTime(GameData.INITIAL_STATE, 11).time, 11);
    assert.equal(GameData.changeTime(GameData.INITIAL_STATE, 100).time, 100);
    assert.equal(GameData.changeTime(GameData.INITIAL_STATE, 99999).time, 99999);
  });

  it(`Invalid data.`, () => {
    assert.equal(GameData.changeTime(GameData.INITIAL_STATE, null).time, GameData.INITIAL_STATE.time);
    assert.equal(GameData.changeTime(GameData.INITIAL_STATE, undefined).time, GameData.INITIAL_STATE.time);
    assert.equal(GameData.changeTime(GameData.INITIAL_STATE, true).time, GameData.INITIAL_STATE.time);
    assert.equal(GameData.changeTime(GameData.INITIAL_STATE, []).time, GameData.INITIAL_STATE.time);
    assert.equal(GameData.changeTime(GameData.INITIAL_STATE, {}).time, GameData.INITIAL_STATE.time);
  });
});

describe(`GameData.addAnswer`, () => {
  it(`Valid score.`, () => {
    assert.deepEqual(GameData.addAnswer(GameData.INITIAL_STATE, 5).answers, [5]);
    assert.deepEqual(GameData.addAnswer(GameData.INITIAL_STATE, 15).answers, [15]);
    assert.deepEqual(GameData.addAnswer(GameData.INITIAL_STATE, 25).answers, [25]);
    assert.deepEqual(GameData.addAnswer(GameData.INITIAL_STATE, -25).answers, [-25]);
  });

  it(`Invalid score.`, () => {
    assert.deepEqual(GameData.addAnswer(GameData.INITIAL_STATE, ``).answers, []);
    assert.deepEqual(GameData.addAnswer(GameData.INITIAL_STATE, `some text`).answers, []);
  });

  it(`Invalid data.`, () => {
    assert.deepEqual(GameData.addAnswer(GameData.INITIAL_STATE, null).answers, []);
    assert.deepEqual(GameData.addAnswer(GameData.INITIAL_STATE, undefined).answers, []);
    assert.deepEqual(GameData.addAnswer(GameData.INITIAL_STATE, true).answers, []);
    assert.deepEqual(GameData.addAnswer(GameData.INITIAL_STATE, {}).answers, []);
  });
});
