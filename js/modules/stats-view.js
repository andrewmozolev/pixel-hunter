import AbstractView from '../utils/abstractview';
import {countScores} from '../data/game-data';
import StatLineView from './statline-view';


export default class StatsView extends AbstractView {
  constructor(state, bonuses, isDefeat) {
    super();

    this._state = state;
    this._bonuses = bonuses;
    this._isDefeat = isDefeat;
  }

  get template() {
    return `<section class="result">
        <h2 class="result__title">${this._isDefeat ? `Поражение!` : `Победа!`}</h2>
        <table class="result__table">
          <tr>
            <td class="result__number">0.</td>
            <td colspan="2">
              ${new StatLineView(this._state.answers).template}
            </td>
            <td class="result__points">× ${this._isDefeat ? 0 : 100}</td>
            <td class="result__total">${this._isDefeat ? 0 : this._state.answers.reduce((acc, answer) => acc + answer >= 0 ? 100 : 0, 0)}</td>
          </tr>
            ${this._bonuses.map((bonus) => `<tr>
              <td></td>
              <td class="result__extra">${bonus.title}</td>
              <td class="result__extra">${bonus.value}<span class="stats__result stats__result--fast"></span></td>
              <td class="result__points">× ${bonus.quantifier}</td>
              <td class="result__total">${bonus.value * bonus.quantifier}</td>
            </tr>`).join(``)}
          <tr>
            <td colspan="5" class="result__total  result__total--final">${countScores(this._state.answers, this._state.lives)}</td>
          </tr>
        </table>
      </section>`;
  }
}
