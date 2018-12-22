import Utils from '../utils/utils';
import Option from './option';


export default class Question {
  /** @param {Question.DataType} data */
  constructor(data) {
    this.options = data.options;
    this.title = data.title;
    this.type = data.type;
  }

  /**
   * @param {Object} data
   * @static
   * @return {Question}
   */
  static parse(data) {
    return new Question({
      options: Utils.parseArray(data[`answers`], Option.parse),
      title: data[`question`],
      type: data[`type`],
    });
  }
}

/**
 * @typedef {{
 *   options: Array<Option>,
 *   title: string,
 *   type: string,
 * }} Question.DataType
 */

/** @enum {string} */
Question.Type = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`,
};
