import AbstractView from '../utils/abstract-view';


export default class RulesView extends AbstractView {
  constructor() {
    super();

    /** @private {?HTMLElement} */
    this._input = null;

    /** @private {?HTMLElement} */
    this._btn = null;
  }

  /** @return {HTMLElement} */
  get input() {
    return this._input;
  }

  /** @return {string} */
  get value() {
    return this.input.value;
  }

  /** @inheritDoc */
  get template() {
    return `<section class="rules">
      <h2 class="rules__title">Правила</h2>
      <ul class="rules__description">
        <li>Угадай 10 раз для каждого изображения фото
          <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
          <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
        <li>Фотографиями или рисунками могут быть оба изображения.</li>
        <li>На каждую попытку отводится 30 секунд.</li>
        <li>Ошибиться можно не более 3 раз.</li>
      </ul>
      <p class="rules__ready">Готовы?</p>
      <form class="rules__form">
        <input class="rules__input" type="text" value="" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </section>`;
  }

  /** @inheritDoc */
  bind() {
    const form = this.element.querySelector(`.rules__form`);
    this._input = this.element.querySelector(`.rules__input`);
    this._btn = this.element.querySelector(`.rules__button`);

    this._input.addEventListener(`input`, () => this.onInputHandler());
    this._input.addEventListener(`blur`, (evt) => this.onBlurHandler(evt));
    form.addEventListener(`submit`, (evt) => this.onSubmitHandler(evt));
  }

  switchButton(isButtonEnabled) {
    if (isButtonEnabled) {
      this._btn.removeAttribute(`disabled`);
    } else {
      this._btn.setAttribute(`disabled`, `disabled`);
    }
  }

  resetInput() {
    this.input.value = ``;
  }

  /** @abstract */
  onBlurHandler() {}

  /** @abstract */
  onInputHandler() {}

  /** @abstract */
  onSubmitHandler() {}
}
