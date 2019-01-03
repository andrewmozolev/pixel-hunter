export default class Image {
  height: number;
  url: string;
  width: number;

  constructor(data: ImageDataType) {
    this.height = data.height;
    this.url = data.url;
    this.width = data.width;
  }

  static parse(data: object):Image {
    return new Image({
      height: data[`height`],
      url: data[`url`],
      width: data[`width`],
    });
  }
}

type ImageDataType = {
  height: number,
  url: string,
  width: number,
}
