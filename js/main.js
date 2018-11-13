'use strict';

const Screen = {
  INTRO: `intro`,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME_1: `game-1`,
  GAME_2: `game-2`,
  GAME_3: `game-3`,
  STATS: `stats`,
  MODAL_ERROR: `modal-error`,
  MODAL_CONFIRM: `modal-confirm`,
};

const Key = {
  LEFT: 37,
  RIGHT: 39,
};

const SCREENS_IN_ORDER = [
  Screen.INTRO,
  Screen.GREETING,
  Screen.RULES,
  Screen.GAME_1,
  Screen.GAME_2,
  Screen.GAME_3,
  Screen.STATS,
  Screen.MODAL_ERROR,
  Screen.MODAL_CONFIRM,
];

const arrowsTemplate = `<div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button id="arrow-left" class="arrows__btn"><-</button>
  <button id="arrow-right" class="arrows__btn">-></button>
</div>`;

const templates = SCREENS_IN_ORDER.map((id) => document.getElementById(id));
const main = document.getElementById(`main`);

let currentScreen = 0;

document.addEventListener(`keydown`, keyHandler);

function renderTemplate(index) {
  main.innerHTML = ``;
  main.appendChild(templates[index].content.cloneNode(true));
}

function keyHandler(evt) {
  if (evt.keyCode === Key.LEFT) {
    decrease();
  }
  if (evt.keyCode === Key.RIGHT) {
    increase();
  }
}

function increase() {
  if (currentScreen === SCREENS_IN_ORDER.length - 1) {
    return;
  }
  renderTemplate(++currentScreen);
}

function decrease() {
  if (currentScreen === 0) {
    return;
  }
  renderTemplate(--currentScreen);
}

function createElementFromString(string) {
  const div = document.createElement(`div`);
  div.innerHTML = string;
  return div;
}

document.body.appendChild(createElementFromString(arrowsTemplate));
const arrowLeft = document.getElementById(`arrow-left`);
const arrowRight = document.getElementById(`arrow-right`);
arrowLeft.addEventListener(`click`, decrease);
arrowRight.addEventListener(`click`, increase);

renderTemplate(currentScreen);
