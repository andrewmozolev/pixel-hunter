interface AbstractView {
  bind(): void;
}

abstract class AbstractView {
  private _element: Element;

  get element(): Element {
    if (this._element) {
      return this._element;
    }
    this._element = this.createDom();
    this.bind();
    return this._element;
  }

  protected createDom(): Element {
    const div = document.createElement(`div`);
    div.innerHTML = this.template.trim();
    const isOneChild = div.childNodes.length === 1;
    const el = isOneChild ? div.childNodes[0] : div;
    return <Element> el;
  }

  abstract get template(): string;

  bind(): void {};

  onEnterDocument(): void {};
}

export default AbstractView;
