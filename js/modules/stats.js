import utils from '../utils/utils';
import {SETTINGS} from '../data/game-data';
import HeaderView from './header-view';
import StatsView from './stats-view';
import intro from './intro';


const getBonuses = (state) => {
  const bonuses = [];
  const speedBonuses = state.answers.reduce((acc, answer) => {
    return acc + answer >= 0 && answer < SETTINGS.MAX_FAST_TIME ? 1 : 0;
  }, 0);
  const livesBonuses = state.lives;
  const slowPenalties = state.answers.reduce((acc, answer) => {
    return acc + answer >= SETTINGS.MIN_SLOW_TIME ? 1 : 0;
  }, 0);

  if (speedBonuses) {
    bonuses.push({
      title: `Бонус за скорость:`,
      value: speedBonuses,
      quantifier: 50
    });
  }

  if (livesBonuses) {
    bonuses.push({
      title: `Бонус за жизни:`,
      value: livesBonuses,
      quantifier: 50
    });
  }

  if (slowPenalties) {
    bonuses.push({
      title: `Штраф за медлительность:`,
      value: livesBonuses,
      quantifier: -50
    });
  }

  return bonuses;
};

export default (state) => {
  const isDefeat = state.lives === 0;
  const statsView = new StatsView(state, getBonuses(state), isDefeat);
  const headerView = new HeaderView(state, false);
  headerView.onBackClick = () => intro();

  utils.addChildren(headerView, statsView);
};
