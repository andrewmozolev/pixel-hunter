import Image from './image';


export default class Option {
  /** @param {Option.TypeDef} data */
  constructor(data) {
    this.image = data.image;
    this.type = data.type;
  }

  /**
   * @param {Object} data
   * @static
   * @return {Option}
   */
  static parse(data) {
    return new Option({
      image: Image.parse(data[`image`]),
      type: data[`type`]
    });
  }
}

/**
 * @typedef {{
 *   image: Image,
 *   type: string
 * }}
 */
Option.TypeDef;

/** @enum {string} */
Option.Type = {
  PAINTING: `painting`,
  PHOTO: `photo`,
};
