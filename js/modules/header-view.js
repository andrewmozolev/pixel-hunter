import AbstractView from '../utils/abstract-view';
import App from '../app';


export default class HeaderView extends AbstractView {
  constructor(state) {
    super();

    this._state = state;

    this._isInfoEnabled = !!state;

    this._timeEl = null;
  }

  get template() {
    return `<header class="header">
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
      ${this._isInfoEnabled ? `<div class="game__timer">${this._state.time}</div>
        <div class="game__lives">
          ${new Array(App.SETTINGS.MAX_LIVES - this._state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`).join(``)}
          ${new Array(this._state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``)}
        </div>` : ``}
    </header>`;
  }

  bind() {
    this._timeEl = this.element.querySelector(`.game__timer`);
    const backBtn = this.element.querySelector(`.back`);
    if (backBtn) {
      backBtn.addEventListener(`click`, () => {
        this.onBackClick();
      });
    }
  }

  setTime(time) {
    this._timeEl.innerHTML = time;
  }

  onBackClick() {}
}
