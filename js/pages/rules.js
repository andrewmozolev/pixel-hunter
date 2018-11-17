import game1 from './game1.js';
import intro from './intro.js';
import {createElementFromString} from '../utils.js';
import {renderElement} from '../utils.js';
import {setBackButton} from '../utils.js';

const rules = createElementFromString(
    `<header class="header">
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
    </header>
    <section class="rules">
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
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </section>`
);

setBackButton(rules, () => renderElement(intro));

/** @type {HTMLElement} */
const input = rules.querySelector(`.rules__input`);

/** @type {HTMLElement} */
const form = rules.querySelector(`.rules__form`);

/** @type {HTMLElement} */
const btn = rules.querySelector(`.rules__button`);

input.addEventListener(`input`, (evt) => {
  if (evt.target.value.trim().length > 0) {
    btn.removeAttribute(`disabled`);
  } else {
    btn.setAttribute(`disabled`, `disabled`);
  }
});

form.addEventListener(`submit`, () => {
  renderElement(game1);
});

export default rules;
