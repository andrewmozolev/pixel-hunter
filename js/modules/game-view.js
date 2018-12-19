import AbstractView from '../utils/abstract-view';
import App from '../app';
import Option from '../data/option';
import Question from '../data/question';
import Utils from '../utils/utils';


export default class GameView extends AbstractView {
  /**
   * @param {Question} question
   * @param {string} correctType
   */
  constructor(question, correctType) {
    super();

    /** @private {Question} */
    this._question = question;

    /** @private {?HTMLElement} */
    this._form = null;

    /** @private {string} */
    this._correctType = correctType;

    /** @private {?Array<HTMLElement> */
    this._inputsElementsElements = null;

    /** @private {?Array<HTMLElement> */
    this._optionsElements = null;
  }

  /** @return {?HTMLElement} */
  get form() {
    return this._form;
  }

  /** @inheritDoc */
  get template() {
    const formClassName = Utils.className(GameView.ClassName.GAME_CONTENT,
        this._question.type === Question.Type.TINDER_LIKE, `wide`,
        this._question.type === Question.Type.ONE_OF_THREE, `triple`);

    return `
        <section class="game">
          <p class="game__task">${this._question.title}</p>
          <form class="${formClassName}">
            ${this._question.options.map(this._getOption.bind(this)).join(``)}
          </form>
        </section>`;
  }

  /** @inheritDoc */
  bind() {
    this._form = this.element.querySelector(`.${GameView.ClassName.GAME_CONTENT}`);
    this._form.addEventListener(`click`, (evt) => this.onFormClickHandler(evt));
    this._form.addEventListener(`change`, () => this.onFormChangeHandler());
  }

  /**
   * @param {Option} option
   * @param {number} index
   * @return {string}
   * @private
   */
  _getOption(option, index) {
    const optionClassName = Utils.className(GameView.ClassName.GAME_OPTION,
        App.SETTINGS.DEBUG && option.type === this._correctType, `correct`);

    const optionAsImage = `<div class="${optionClassName}">
        <img class="${GameView.ClassName.GAME_IMAGE}" src="${option.image.url}" alt="Option ${index + 1}" width="304" height="455">
    </div>`;


    const photoLabelClassName = Utils.className(GameView.ClassName.GAME_ANSWER,
        true, `photo`,
        App.SETTINGS.DEBUG && option.type === Option.Type.PHOTO, `correct`);
    const paintingLabelClassName = Utils.className(GameView.ClassName.GAME_ANSWER,
        true, `painting`,
        App.SETTINGS.DEBUG && option.type === Option.Type.PAINTING, `correct`);

    const optionWithButtons = `<div class="${GameView.ClassName.GAME_OPTION}">
      <img class="${GameView.ClassName.GAME_IMAGE}" src="${option.image.url}" alt="Option ${index + 1}" width="468" height="458">
      <label class="${photoLabelClassName}">
        <input class="visually-hidden" name="question${index + 1}" type="radio" value="${Option.Type.PHOTO}">
        <span>Фото</span>
      </label>
      <label class="${paintingLabelClassName}">
        <input class="visually-hidden" name="question${index + 1}" type="radio" value="${Option.Type.PAINTING}">
        <span>Рисунок</span>
      </label>
    </div>`;

    return this._question.type === Question.Type.ONE_OF_THREE ?
      optionAsImage : optionWithButtons;
  }

  /** @return {Array<HTMLElement>} */
  getInputsElements() {
    if (!this._inputsElements) {
      this._inputsElements = [...this._form.elements];
    }
    return this._inputsElements;
  }

  /** @return {Array<HTMLElement>} */
  getOptionsElements() {
    if (!this._optionsElements) {
      this._optionsElements =
        [...this._form.getElementsByClassName(GameView.ClassName.GAME_OPTION)];
    }
    return this._optionsElements;
  }

  /**
   * @param {number} index
   * @return {HTMLElement}
   */
  getPreciseImage(index) {
    const option = this._getPreciseOption(index);
    return option.querySelector(`.${GameView.ClassName.GAME_IMAGE}`);
  }

  /**
   * @param {index} index
   * @return {HTMLElement}
   */
  getPreciseImageCheckedInput(index) {
    const option = this._getPreciseOption(index);
    return option.querySelector(`input:checked`);
  }

  /**
   * @param {number} index
   * @return {HTMLElement}
   * @private
   */
  _getPreciseOption(index) {
    return this.getOptionsElements()[index];
  }

  /** @abstract */
  onFormChangeHandler() {}

  /** @abstract */
  onFormClickHandler() {}
}

/** @enum {string} */
GameView.ClassName = {
  GAME_ANSWER: `game__answer`,
  GAME_CONTENT: `game__content`,
  GAME_IMAGE: `game__image`,
  GAME_OPTION: `game__option`,
};
