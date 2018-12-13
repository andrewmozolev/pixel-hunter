export default {
  className(baseClassName, ...args) {
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
};
