export default class Utils {
  static className(baseClassName: string, ...args: (boolean|string)[]): string {
    if (!args.length || args.length % 2 !== 0) {
      return baseClassName;
    }

    const classes = args.reduce((acc, item, index, arr) => {
      if (index % 2 === 0 && !!item) {
        acc.push(`${baseClassName}--${arr[index + 1]}`);
      }

      return acc;
    }, <Array<any>> []);

    classes.unshift(baseClassName);
    return classes.join(` `);
  }

  static parseArray(array: Array<any>, parser: Function): Array<any> {
    const parsedArray = <Array<any>> [];

    for (const item of array) {
      parsedArray.push(parser(item));
    }
    return parsedArray;
  }
}
