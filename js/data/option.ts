import Image from './image';


export type OptionDataType = {
  image: Image,
  type: OptionType,
}

export enum OptionType {
  PAINTING = 'painting',
  PHOTO = 'photo',
};

export default class Option {
  image: Image;
  type: OptionType;

  constructor(data: OptionDataType) {
    this.image = data.image;
    this.type = data.type;
  }

  static parse(data: object): Option {
    return new Option({
      image: Image.parse(data[`image`]),
      type: data[`type`]
    });
  }
}
