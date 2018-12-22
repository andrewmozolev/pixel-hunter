import GameModel from './modules/game-model';
import GamePresenter from './modules/game-presenter';
import GreetingPresenter from './modules/greeting-presenter';
import IntroPresenter from './modules/intro-presenter';
import Loader from './utils/loader';
import RulesPresenter from './modules/rules-presenter';
import StatsPresenter from './modules/stats-presenter';


export default class App {
  /** @static */
  static showIntro() {
    const introPresenter = new IntroPresenter();
    introPresenter.init();
  }

  /** @static */
  static showGreeting() {
    const greetingPresenter = new GreetingPresenter();
    greetingPresenter.init();
  }

  /** @static */
  static showRules() {
    const rulesPresenter = new RulesPresenter();
    rulesPresenter.init();
  }

  /**
   * @param {string} username
   * @static
   */
  static showGame(username) {
    Loader.loadQuestions()
      .then((data) => {
        const model = new GameModel(data, username);
        const gamePresenter = new GamePresenter(model);
        gamePresenter.init();
      });
  }

  /**
   * @param {GameData.StateDataType} state
   * @param {string} username
   * @static
   */
  static showStats(state, username) {
    const statsPresenter = new StatsPresenter(username);
    Loader.sendResults(state, username)
        .then(() => Loader.loadResults(username))
        .then((data) => statsPresenter.init(data));
  }
}
