import AbstractPresenter from '../utils/abstract-presenter';
import IntroView from './intro-view';
import App from '../app';


export default class IntroPresenter extends AbstractPresenter {
  constructor() {
    super();
  }

  init() {
    const introView = new IntroView();
    introView.onAsteriskClick = () => this._onAsteriskClick();
    this.addChildren(introView);
  }

  _onAsteriskClick() {
    App.showGreeting();
  }
}
