/** @type {HTMLElement} */
const main = document.getElementById(`main`);

/**
 * @param {string} string
 * @return {HTMLElement}
 */
const createElementFromString = (string) => {
  const div = document.createElement(`div`);
  div.innerHTML = string;
  return div;
};

/**
 * @param {HTMLElement} elem
 * @param {Function} cb
 */
const setBackButton = (elem, cb) => {
  const backBtn = elem.querySelector(`.back`);
  if (backBtn) {
    backBtn.addEventListener(`click`, () => {
      cb();
    });
  }
};

/** @param {HTMLElement} element */
const renderElement = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

export {createElementFromString, renderElement, setBackButton};
