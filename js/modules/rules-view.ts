import AbstractView from '../utils/abstract-view';
import {Setting} from '../utils/settings';


export default class RulesView extends AbstractView {
  private _input: HTMLInputElement;
  private _btn: Element;

  constructor() {
    super();
  }

  get input(): HTMLInputElement {
    return this._input;
  }

  /** @return {string} */
  get value(): string {
    return this.input.value;
  }

  get template() {
    return `<section class="rules">
      <h2 class="rules__title">Правила</h2>
      <ul class="rules__description">
        <li>Угадай 10 раз для каждого изображения фото
          <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
          <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
        <li>Фотографиями или рисунками могут быть оба изображения.</li>
        <li>На каждую попытку отводится ${Setting.MAX_TIME_FOR_ANSWER} секунд.</li>
        <li>Ошибиться можно не более ${Setting.MAX_LIVES} раз.</li>
      </ul>
      <p class="rules__ready">Готовы?</p>
      <form class="rules__form">
        <input class="rules__input" type="text" value="" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </section>`;
  }

  bind() {
    const form = <Element> this.element.querySelector(`.rules__form`);
    this._input = <HTMLInputElement> this.element.querySelector(`.rules__input`);
    this._btn = <Element> this.element.querySelector(`.rules__button`);

    this._input.addEventListener(`input`, (evt) => this.onInputHandler(evt));
    this._input.addEventListener(`blur`, (evt) => this.onBlurHandler(evt));
    form.addEventListener(`submit`, (evt) => this.onSubmitHandler(evt));
  }

  public switchButton(isButtonEnabled: boolean) {
    if (isButtonEnabled) {
      this._btn.removeAttribute(`disabled`);
    } else {
      this._btn.setAttribute(`disabled`, `disabled`);
    }
  }

  public resetInput() {
    this.input.value = ``;
  }

  onBlurHandler(evt: Event): void {}

  onInputHandler(evt: Event): void {}

  onSubmitHandler(evt: Event): void {}
}
