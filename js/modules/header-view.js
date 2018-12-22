import AbstractView from '../utils/abstract-view';
import {Setting} from '../utils/settings';


export default class HeaderView extends AbstractView {
  /** @param {GameData.StateDataType} state */
  constructor(state) {
    super();

    /** @private {GameData.StateDataType} */
    this._state = state;

    /** @private {boolean} */
    this._isInfoEnabled = !!state;

    /** @private {?HTMLElement} */
    this._timeEl = null;
  }

  /** @inheritDoc */
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
      ${this._isInfoEnabled ? `<div class="${HeaderView.ClassName.GAME_TIMER}">${this._state.time}</div>
        <div class="game__lives">
          ${new Array(Setting.MAX_LIVES - this._state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`).join(``)}
          ${new Array(this._state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``)}
        </div>` : ``}
    </header>`;
  }

  /** @inheritDoc */
  bind() {
    this._timeEl = this.element.querySelector(`.${HeaderView.ClassName.GAME_TIMER}`);
    const backBtn = this.element.querySelector(`.back`);
    backBtn.addEventListener(`click`, () => {
      this.onBackClick();
    });
  }

  /** @param {number} time */
  setTime(time) {
    this._timeEl.innerHTML = time;
  }

  setTimeWarnAnimation() {
    this._timeEl.classList.add(HeaderView.ClassName.GAME_TIMER_WARN);
  }

  /** @abstract */
  onBackClick() {}
}

/** @enum {string} */
HeaderView.ClassName = {
  GAME_TIMER: `game__timer`,
  GAME_TIMER_WARN: `game__timer--warn`,
};
