import intro from './intro';
import {getElementFromTemplate} from '../utils.js';
import {renderElement, setBackButton} from '../utils';
import headerTemplate from '../templates/header';
import statsTemplate from '../templates/stats';
import {countScores, SETTINGS} from '../data/game-data';


const getBonusesTemplate = (state) => {
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

  return bonuses.map((bonus) => `<tr>
    <td></td>
    <td class="result__extra">${bonus.title}</td>
    <td class="result__extra">${bonus.value}<span class="stats__result stats__result--fast"></span></td>
    <td class="result__points">× ${bonus.quantifier}</td>
    <td class="result__total">${bonus.value * bonus.quantifier}</td>
  </tr>`).join(``);
};

const renderStats = (state) => {
  const isDefeat = state.lives === 0;
  const title = isDefeat ? `Поражение!` : `Победа!`;

  const stats = getElementFromTemplate(
      `${headerTemplate(state, true)}
      <section class="result">
        <h2 class="result__title">${title}</h2>
        <table class="result__table">
          <tr>
            <td class="result__number">0.</td>
            <td colspan="2">
              ${statsTemplate(state.answers)}
            </td>
            <td class="result__points">× ${isDefeat ? 0 : 100}</td>
            <td class="result__total">${isDefeat ? 0 : state.answers.reduce((acc, answer) => acc + answer >= 0 ? 100 : 0, 0)}</td>
          </tr>
          ${getBonusesTemplate(state)}
          <tr>
            <td colspan="5" class="result__total  result__total--final">${countScores(state.answers, state.lives)}</td>
          </tr>
        </table>
        <table class="result__table">
          <tr>
            <td class="result__number">1.</td>
            <td colspan="2">
              <ul class="stats">
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--correct"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--unknown"></li>
              </ul>
            </td>
            <td class="result__points">× 100</td>
            <td class="result__total">900</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за скорость:</td>
            <td class="result__extra">1 <span class="stats__result stats__result--fast"></span></td>
            <td class="result__points">× 50</td>
            <td class="result__total">50</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">× 50</td>
            <td class="result__total">100</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Штраф за медлительность:</td>
            <td class="result__extra">2 <span class="stats__result stats__result--slow"></span></td>
            <td class="result__points">× 50</td>
            <td class="result__total">-100</td>
          </tr>
          <tr>
            <td colspan="5" class="result__total  result__total--final">950</td>
          </tr>
        </table>
        <table class="result__table">
          <tr>
            <td class="result__number">2.</td>
            <td>
              <ul class="stats">
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--correct"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--wrong"></li>
              </ul>
            </td>
            <td class="result__total"></td>
            <td class="result__total  result__total--final">fail</td>
          </tr>
        </table>
        <table class="result__table">
          <tr>
            <td class="result__number">3.</td>
            <td colspan="2">
              <ul class="stats">
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--correct"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--unknown"></li>
              </ul>
            </td>
            <td class="result__points">× 100</td>
            <td class="result__total">900</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">× 50</td>
            <td class="result__total">100</td>
          </tr>
          <tr>
            <td colspan="5" class="result__total  result__total--final">950</td>
          </tr>
        </table>
      </section>`
  );

  setBackButton(stats, () => renderElement(intro));

  renderElement(stats);
};

export default renderStats;
