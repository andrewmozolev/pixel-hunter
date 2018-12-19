import AbstractPresenter from '../utils/abstract-presenter';
import HeaderView from './header-view';
import App from '../app';
import StatsView from './stats-view';

export default class StatsPresenter extends AbstractPresenter {
  constructor(state) {
    super();

    /** @private {GameData.StateDataType}*/
    this._state = state;
  }

  /** @inheritDoc */
  init() {
    const headerView = new HeaderView();
    headerView.onBackClick = () => App.showIntro();

    const isDefeat = this._state.lives === 0;
    const statsView = new StatsView(this._state, this._getBonuses(this._state), isDefeat);

    this.addChildren(headerView, statsView);
  }

  /**
   * @param {GameData.StateDataType} state
   * @return {Array<*>}
   * @private
   */
  _getBonuses(state) {
    const bonuses = [];
    const speedBonuses = state.answers.reduce((acc, answer) => {
      return acc + answer >= 0 && answer < App.SETTINGS.MAX_FAST_TIME ? 1 : 0;
    }, 0);
    const livesBonuses = state.lives;
    const slowPenalties = state.answers.reduce((acc, answer) => {
      return acc + answer >= App.SETTINGS.MIN_SLOW_TIME ? 1 : 0;
    }, 0);

    if (speedBonuses) {
      bonuses.push({
        title: `Бонус за скорость:`,
        value: speedBonuses,
        quantifier: App.SETTINGS.SCORE_FAST
      });
    }

    if (livesBonuses) {
      bonuses.push({
        title: `Бонус за жизни:`,
        value: livesBonuses,
        quantifier: App.SETTINGS.SCORE_LIFE
      });
    }

    if (slowPenalties) {
      bonuses.push({
        title: `Штраф за медлительность:`,
        value: livesBonuses,
        quantifier: App.SETTINGS.SCORE_SLOW
      });
    }

    return bonuses;
  }
}
