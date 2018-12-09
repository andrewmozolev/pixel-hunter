export default {
  _main: document.getElementById(`main`),

  getElementFromTemplate(string) {
    const div = document.createElement(`div`);
    div.innerHTML = string;
    return div;
  },

  addChild(child) {
    this._main.innerHTML = ``;
    this._main.appendChild(child.element);
    child.onEnterDocument();
  },

  addChildren(...children) {
    this._main.innerHTML = ``;

    for (let child of children) {
      this._main.appendChild(child.element);
      child.onEnterDocument();
    }
  },

  addElement(element, ...args) {
    this._main.innerHTML = ``;
    this._main.appendChild(element);

    if (args.length === 0) {
      return;
    }

    for (let item of args) {
      this._main.appendChild(item);
    }
  },

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
