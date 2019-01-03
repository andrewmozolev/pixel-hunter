type StatDataType = {
  answers: Array<number>,
  date: number,
  lives: number,
};

export default class Stat {
  answers: Array<number>;
  date: number;
  lives: number;

  constructor(data: StatDataType) {
    this.answers = data.answers;
    this.date = data.date;
    this.lives = data.lives;
  }

  static parse(data: object): Stat {
    return new Stat({
      answers: data[`stats`],
      date: data[`date`],
      lives: data[`lives`],
    });
  }
}
