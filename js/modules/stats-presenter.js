import AbstractPresenter from '../utils/abstract-presenter';
import App from '../app';
import HeaderView from './header-view';
import StatsView from './stats-view';
import {Setting} from '../utils/settings';


export default class StatsPresenter extends AbstractPresenter {
  /** @param {string} username */
  constructor(username) {
    super();

    /** @private {?Array<Stat>}*/
    this._stats = null;

    /** @private {string} */
    this._username = username;
  }

  /** @param {Array<Stat>} stats */
  init(stats) {
    this._stats = stats;

    const headerView = new HeaderView();
    headerView.onBackClick = () => App.showGreeting();

    const statsView = new StatsView(this._stats,
        this._getBonusesPack(this._stats));

    this.addChildren(headerView, statsView);
  }

  /**
   * @param {Array<Stat>} stats
   * @return {Array<*>}
   * @private
   */
  _getBonusesPack(stats) {
    return stats.map((stat) => this._getBonuses(stat));
  }

  /**
   * @param {GameData.StateDataType} state
   * @return {Array<*>}
   * @private
   */
  _getBonuses(state) {
    const bonuses = [];
    const speedBonuses = state.answers.reduce((acc, answer) => {
      return acc + (answer >= 0 && answer < Setting.MAX_FAST_TIME ? 1 : 0);
    }, 0);
    const livesBonuses = state.lives;
    const slowPenalties = state.answers.reduce((acc, answer) => {
      return acc + (answer >= Setting.MIN_SLOW_TIME ? 1 : 0);
    }, 0);

    if (speedBonuses) {
      bonuses.push({
        title: `Бонус за скорость:`,
        value: speedBonuses,
        quantifier: Setting.SCORE_FAST
      });
    }

    if (livesBonuses) {
      bonuses.push({
        title: `Бонус за жизни:`,
        value: livesBonuses,
        quantifier: Setting.SCORE_LIFE
      });
    }

    if (slowPenalties) {
      bonuses.push({
        title: `Штраф за медлительность:`,
        value: slowPenalties,
        quantifier: Setting.SCORE_SLOW
      });
    }

    return bonuses;
  }
}
