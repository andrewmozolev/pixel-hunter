import Utils from '../utils/utils';
import Option from './option';

type QuestionDataType = {
  options: Array<Option>,
  title: string,
  type: QuestionType,
}

export enum QuestionType {
  TWO_OF_TWO = 'two-of-two',
  TINDER_LIKE = 'tinder-like',
  ONE_OF_THREE = 'one-of-three',
};

export default class Question {
  options: Array<Option>;
  title: string;
  type: QuestionType;

  constructor(data: QuestionDataType) {
    this.options = data.options;
    this.title = data.title;
    this.type = data.type;
  }

  static parse(data: object): Question {
    return new Question({
      options: Utils.parseArray(data[`answers`], Option.parse),
      title: data[`question`],
      type: data[`type`],
    });
  }
}
