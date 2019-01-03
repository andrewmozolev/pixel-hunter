import GameModel from './modules/game-model';
import GamePresenter from './modules/game-presenter';
import GreetingPresenter from './modules/greeting-presenter';
import IntroPresenter from './modules/intro-presenter';
import Loader from './utils/loader';
import RulesPresenter from './modules/rules-presenter';
import StatsPresenter from './modules/stats-presenter';
import {StateDataType} from "./data/game-data";


export default class App {
  static showIntro() {
    const introPresenter = new IntroPresenter();
    introPresenter.init();
  }

  static showGreeting() {
    const greetingPresenter = new GreetingPresenter();
    greetingPresenter.init();
  }

  static showRules() {
    const rulesPresenter = new RulesPresenter();
    rulesPresenter.init();
  }

  static async showGame(username: string) {
    const questions = await Loader.loadQuestions();
    const model = new GameModel(questions, username);
    const gamePresenter = new GamePresenter(model);
    gamePresenter.init();
  }

  static async showStats(state: StateDataType, username: string) {
    const statsPresenter = new StatsPresenter(username);
    await Loader.sendResults(state, username);
    const result = await Loader.loadResults(username);
    statsPresenter.init(result);
  }
}
