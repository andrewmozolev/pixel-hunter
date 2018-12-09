import renderStats from './stats';
import utils from '../utils/utils';
import {addAnswer, levels, removeLife, SETTINGS} from '../data/game-data';
import {nextLevel} from '../data/game-data';
import GameView from './game-view';
import HeaderView from './header-view';
import intro from './intro';
import StatLineView from './statline-view';


const time = () => Math.round(Math.random() * 25); // TODO: change after timer

const GameType = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
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

  const gameView = new GameView(level, titles[gameType]);
  const headerView = new HeaderView(state);
  const statsLineView = new StatLineView(state.answers);

  headerView.onBackClick = () => intro();
  utils.addChildren(headerView, gameView, statsLineView);

  const renderGameAccordingAnswer = () => {
    if (isCorrectAnswer) {
      renderGame(nextLevel(addAnswer(state, time())));
    } else {
      renderGame(nextLevel(addAnswer(removeLife(state), -time())));
    }
  };

  gameView.onFormChangeHandler = () => {
    const questions = [...gameView.getFormElements()];

    const checkedInputs = questions.reduce((acc, input) => {
      if (input.checked) {
        acc.push(input);
      }
      return acc;
    }, []);

    if (checkedInputs.length !== level.length) {
      return;
    }

    isCorrectAnswer = checkedInputs.every((input, index) => {
      return level[index][1] ?
        input.value === `paint` :
        input.value === `photo`;
    });
    renderGameAccordingAnswer();
  };

  gameView.onFormClickHandler = (evt) => {
    let target = evt.target;

    while (target !== gameView.form) {
      if (target.className === `game__option`) {
        isCorrectAnswer = levels[state.level][target.querySelector(`img`).src];
        renderGameAccordingAnswer();
        return;
      }
      target = target.parentNode;
    }
  };
};

export default renderGame;
