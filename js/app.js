import GameModel from './modules/game-model';
import GamePresenter from './modules/game-presenter';
import GreetingPresenter from './modules/greeting-presenter';
import IntroPresenter from './modules/intro-presenter';
import RulesPresenter from './modules/rules-presenter';
import {SETTINGS} from './utils/settings';
import StatsPresenter from './modules/stats-presenter';

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

  static showGame() {
    const model = new GameModel(`playerName`);
    const gamePresenter = new GamePresenter(model);
    gamePresenter.init();
  }

  static showStats(state) {
    const statsPresenter = new StatsPresenter(state);
    statsPresenter.init();
  }
}

App.SETTINGS = SETTINGS;
