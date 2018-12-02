import intro from './intro';
import renderStats from './stats';
import game1 from '../templates/game1';
import game2 from '../templates/game2';
import game3 from '../templates/game3';
import {getElementFromTemplate} from '../utils';
import {renderElement} from '../utils';
import {setBackButton} from '../utils';
import headerTemplate from '../templates/header';
import statsTemplate from '../templates/stats';
import {addAnswer, levels, removeLife, SETTINGS} from '../data/game-data';
import {nextLevel} from '../data/game-data';


const time = () => Math.round(Math.random() * 25); // TODO: change after timer

const GameType = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
};

const gameTemplate = {
  [GameType.ONE]: game1,
  [GameType.TWO]: game2,
  [GameType.THREE]: game3,
};

const titles = {
  [GameType.ONE]: `Угадай, фото или рисунок?`,
  [GameType.TWO]: `Угадайте для каждого изображения фото или рисунок?`,
  [GameType.THREE]: `Найдите рисунок среди изображений`,
};


const renderGame = (state) => {
  if (state.answers.length === SETTINGS.MAX_LEVELS ||
      state.lives === 0) {
    renderStats(state);
    return;
  }
  const level = Object.entries(levels[state.level]);
  const gameType = level.length;
  let isCorrectAnswer = false;

  const game = getElementFromTemplate(
      `${headerTemplate(state, true)}
        <section class="game">
          <p class="game__task">${titles[gameType]}</p>
          ${gameTemplate[gameType](level)}
          ${statsTemplate(state.answers)}
        </section>`
  );

  const renderGameAccordingAnswer = () => {
    if (isCorrectAnswer) {
      renderGame(nextLevel(addAnswer(state, time())));
    } else {
      renderGame(nextLevel(addAnswer(removeLife(state), -time())));
    }
  };

  /** @type {HTMLElement} */
  const form = game.querySelector(`.game__content`);

  if (gameType === GameType.ONE) {
    form.addEventListener(`change`, (evt) => {
      isCorrectAnswer = level[0][1] ?
        evt.target.value === `paint` && level[0][1] :
        evt.target.value === `photo` && !level[0][1];
      renderGameAccordingAnswer();
    });
  }

  if (gameType === GameType.TWO) {
    /** @type {Array<HTMLElement>} */
    const questions = [...form.elements];

    /** @const {number} */
    const AMOUNT_OF_QUESTIONS = 2;

    form.addEventListener(`change`, () => {
      const checkedInputs = questions.reduce((acc, input) => {
        if (input.checked) {
          acc.push(input);
        }
        return acc;
      }, []);

      if (checkedInputs.length !== AMOUNT_OF_QUESTIONS) {
        return;
      }

      isCorrectAnswer = checkedInputs.every((input, index) => {
        return level[index][1] ?
          input.value === `paint` :
          input.value === `photo`;
      });
      renderGameAccordingAnswer();
    });
  }

  if (gameType === GameType.THREE) {

    form.addEventListener(`click`, (evt) => {
      let target = evt.target;

      while (target !== form) {
        if (target.className === `game__option`) {
          isCorrectAnswer = levels[state.level][target.querySelector(`img`).src];
          renderGameAccordingAnswer();
          return;
        }
        target = target.parentNode;
      }
    });
  }

  setBackButton(game, () => renderElement(intro));

  renderElement(game);
};

export default renderGame;
