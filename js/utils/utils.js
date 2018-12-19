export default class Utils {
  /**
   * @param {string} baseClassName
   * @param {...(boolean|string)} args
   * @static
   * @return {string}
   */
  static className(baseClassName, ...args) {
    if (!args.length || args.length % 2 !== 0) {
      return baseClassName;
    }

    const classes = args.reduce((acc, item, index, arr) => {
      if (index % 2 === 0 && !!item) {
        acc.push(`${baseClassName}--${arr[index + 1]}`);
      }

      return acc;
    }, []);

    classes.unshift(baseClassName);
    return classes.join(` `);
  }

  /**
   * @param {Array<*>} array
   * @param {Function} parser
   * @static
   * @return {Array<*>}
   */
  static parseArray(array, parser) {
    const parsedArray = [];

    for (const item of array) {
      parsedArray.push(parser(item));
    }
    return parsedArray;
  }
}
