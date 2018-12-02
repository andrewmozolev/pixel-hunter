import greeting from './greeting.js';
import {getElementFromTemplate} from '../utils.js';
import {renderElement} from '../utils.js';

/** @type {HTMLElement} */
const intro = getElementFromTemplate(
    `<section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>`
);

/** @type {HTMLElement} */
const asterisk = intro.querySelector(`.intro__asterisk`);

asterisk.addEventListener(`click`, () => {
  renderElement(greeting);
});

export default intro;
