import AbstractView from '../utils/abstract-view';
import utils from '../utils/utils';


export default class GameView extends AbstractView {
  constructor(level, title) {
    super();

    this._levelEntry = Object.keys(level);
    this._title = title;
    this._form = null;
  }

  get form() {
    return this._form;
  }

  get optionClassName() {
    return `game__option`;
  }

  /** @inheritDoc */
  get template() {
    const formClassName = utils.className(`game__content`,
        this._levelEntry.length === 1, `wide`,
        this._levelEntry.length === 3, `triple`);

    return `
        <section class="game">
          <p class="game__task">${this._title}</p>
          <form class="${formClassName}">
            ${this._levelEntry.map(this._getOption.bind(this)).join(``)}
          </form>
        </section>`;
  }

  /** @inheritDoc */
  bind() {
    this._form = this.element.querySelector(`.game__content`);
    this._form.addEventListener(`click`, (evt) => this.onFormClickHandler(evt));
    this._form.addEventListener(`change`, (evt) => this.onFormChangeHandler(evt));
  }

  _getOption(option, index) {
    const optionAsImage = `<div class="${this.optionClassName}">
        <img class="game__image" src="${option}" alt="Option ${index + 1}" width="304" height="455">
    </div>`;

    const optionWithButtons = `<div class="game__option">
      <img class="game__image" src="${option}" alt="Option ${index + 1}" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="question${index + 1}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`;

    return this._levelEntry.length === 3 ? optionAsImage : optionWithButtons;
  }

  getFormElements() {
    return this._form.elements;
  }

  /** @abstract */
  onFormChangeHandler() {}

  /** @abstract */
  onFormClickHandler() {}
}
