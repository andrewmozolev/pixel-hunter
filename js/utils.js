/** @type {HTMLElement} */
const main = document.getElementById(`main`);

/**
 * @param {string} string
 * @return {HTMLElement}
 */
export const getElementFromTemplate = (string) => {
  const div = document.createElement(`div`);
  div.innerHTML = string;
  return div;
};

/**
 * @param {HTMLElement} elem
 * @param {Function} cb
 */
export const setBackButton = (elem, cb) => {
  const backBtn = elem.querySelector(`.back`);
  if (backBtn) {
    backBtn.addEventListener(`click`, () => {
      cb();
    });
  }
};

/** @param {HTMLElement} element */
export const renderElement = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

export const className = (baseClassName, ...args) => {
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
};
