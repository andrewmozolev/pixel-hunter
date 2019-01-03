import AbstractView from '../utils/abstract-view';
import GameData from '../data/game-data';
import StatLineView from './statline-view';
import {Setting} from '../utils/settings';
import Stat from '../data/stat';


export default class StatsView extends AbstractView {
  private _stats: Array<Stat>;
  private _bonuses: Array<any>;

  constructor(stats: Array<Stat>, bonuses: Array<any>) {
    super();

    this._stats = stats;
    this._bonuses = bonuses;
  }


  get template(): string {
    return this._stats.map((stat, index) => {
      const isDefeat = stat.lives === 0;
      const rightAnswersScore = GameData.getRightAnswersScore(stat.answers);

      return `<section class="result">
        ${index === 0 ? `<h2 class="result__title">${isDefeat ? `Поражение!` : `Победа!`}</h2>` : ``}
        <table class="result__table">
          <tr>
            <td class="result__number">${index}.</td>
            <td colspan="2">
              ${new StatLineView(stat.answers).template}
            </td>
            ${isDefeat ? `
                <td class="result__total"></td>
                <td class="result__total result__total--final">FAIL</td>` : `
                <td class="result__points">× ${Setting.SCORE_CORRECT}</td>
                <td class="result__total">${rightAnswersScore}</td>`}
          </tr>
            ${isDefeat ? `` : this._bonuses[index].map((bonus) => `<tr>
              <td></td>
              <td class="result__extra">${bonus.title}</td>
              <td class="result__extra">${bonus.value}<span class="stats__result stats__result--fast"></span></td>
              <td class="result__points">× ${bonus.quantifier}</td>
              <td class="result__total">${bonus.value * bonus.quantifier}</td>
            </tr>`).join(``)}
          ${isDefeat ? `` : `<tr>
            <td colspan="5" class="result__total  result__total--final">${GameData.countScores(stat.answers, stat.lives)}</td>
          </tr>`}
        </table>
      </section>`;
    }).join(``);
  }
}
