export default class AbstractPresenter {
  constructor() {
    /** @private {HTMLElement} */
    this._main = document.getElementById(`main`);
  }

  /** @param {...AbstractView} children */
  addChildren(...children) {
    this._main.innerHTML = ``;

    for (let child of children) {
      this._main.appendChild(child.element);
      child.onEnterDocument();
    }
  }
}
