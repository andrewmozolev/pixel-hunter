export default (frame, image) => {
  const frameMinSize = Math.min(frame.height, frame.width);

  if (image.height === image.width) {
    return {
      height: frameMinSize,
      width: frameMinSize
    };
  }

  const widthRatio = frame.width / image.width;
  const heightRatio = frame.height / image.height;

  if (widthRatio < heightRatio) {
    return {
      height: (widthRatio) * image.height,
      width: frame.width
    };
  } else {
    return {
      height: frame.height,
      width: (heightRatio) * image.width
    };
  }
};
