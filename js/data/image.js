export default class Image {
  /** @param {Image.DataType} data */
  constructor(data) {
    this.height = data.height;
    this.url = data.url;
    this.width = data.width;
  }

  /**
   * @param {Object} data
   * @static
   * @return {Image}
   */
  static parse(data) {
    return new Image({
      height: data[`height`],
      url: data[`url`],
      width: data[`width`],
    });
  }
}

/**
 * @typedef {{
 *   height: number,
 *   url: string,
 *   width: number,
 * }} Image.DataType
 */
