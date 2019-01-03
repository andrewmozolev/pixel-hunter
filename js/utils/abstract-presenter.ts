import AbstractView from "./abstract-view";

export default class AbstractPresenter {
  readonly main: Element;

  constructor() {
    this.main = document.getElementById(`main`) || window.document.body;
  }

  addChildren(...children: AbstractView[]) {
    this.main.innerHTML = ``;

    for (let child of children) {
      this.main.appendChild(child.element);
      child.onEnterDocument();
    }
  }
}
