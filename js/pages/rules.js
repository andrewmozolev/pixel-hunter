import renderGame from './game';
import intro from './intro';
import {getElementFromTemplate} from '../utils';
import {renderElement} from '../utils';
import {setBackButton} from '../utils';
import headerTemplate from '../templates/header';
import {INITIAL_STATE} from '../data/game-data';


const rules = getElementFromTemplate(
    `${headerTemplate(INITIAL_STATE)}
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
        <input class="rules__input" type="text" value="" placeholder="Ваше Имя">
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

form.addEventListener(`submit`, (evt) => {
  input.value = ``;
  evt.preventDefault();
  renderGame(INITIAL_STATE);
});

export default rules;

