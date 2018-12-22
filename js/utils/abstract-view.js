export default class AbstractView {
  constructor() {
    /** @private {?Element} */
    this._element = null;
  }

  /**
   * @return {string}
   * @abstract
   */
  get template() {
    if (new.target === AbstractView) {
      throw new Error(`Don't use template for AbstractView class`);
    }
  }

  /** @return {HTMLElement} */
  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.createDom();
    this.bind();
    return this._element;
  }

  /** @return {HTMLElement} */
  createDom() {
    const div = document.createElement(`div`);
    div.innerHTML = this.template.trim();
    return div.childNodes.length > 1 ? div : div.childNodes[0];
  }

  /** @abstract */
  bind() {}

  /** @abstract */
  onEnterDocument() {}
}
