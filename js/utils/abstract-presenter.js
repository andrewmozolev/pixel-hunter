export default class AbstractPresenter {
  constructor() {
    this._children = new Map();
    this._main = document.getElementById(`main`);
  }

  // getElementFromTemplate(template = ``, tag = `div`) {
  //   const div = document.createElement(tag);
  //   div.innerHTML = template;
  //   return div;
  // }
  //
  // update(oldChild, newChild) {
  //   const container = this._children.get(oldChild);
  //   this._children.delete(oldChild);
  //   this._children.set(newChild, container);
  //   this.addChild(newChild, container);
  // }
  //
  // addChild(child, _optContainer) {
  //   if (_optContainer) {
  //     _optContainer.innerHTML = ``;
  //     _optContainer.appendChild(child.element);
  //     child.onEnterDocument();
  //     return;
  //   }
  //   this._main.innerHTML = ``;
  //   const container = this.getElementFromTemplate();
  //   this._children.set(child, container);
  //   container.appendChild(child.element);
  //   this._main.appendChild(container);
  //   child.onEnterDocument();
  // }

  addChildren(...children) {
    this._main.innerHTML = ``;

    for (let child of children) {
      this._main.appendChild(child.element);
      child.onEnterDocument();
    }
  }
}
