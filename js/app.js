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
  static async showGame(username) {
    const questions = await Loader.loadQuestions();
    const model = new GameModel(questions, username);
    const gamePresenter = new GamePresenter(model);
    gamePresenter.init();
  }

  /**
   * @param {GameData.StateDataType} state
   * @param {string} username
   * @static
   */
  static async showStats(state, username) {
    const statsPresenter = new StatsPresenter(username);
    await Loader.sendResults(state, username);
    const result = await Loader.loadResults(username);
    statsPresenter.init(result);
  }
}
