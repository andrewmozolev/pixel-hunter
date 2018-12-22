export default class Stat {
  /** @param {Stat.DataType} data */
  constructor(data) {
    this.answers = data.answers;
    this.date = data.date;
    this.lives = data.lives;
  }

  /**
   * @param {Object} data
   * @return {Stat}
   */
  static parse(data) {
    return new Stat({
      answers: data[`stats`],
      date: data[`date`],
      lives: data[`lives`],
    });
  }
}

/**
 * @typedef {{
 *   date: number,
 *   answers: Array<number>,
 *   lives: number,
 * }} Stat.DataType
 */
