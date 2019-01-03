import AbstractPresenter from '../utils/abstract-presenter';
import App from '../app';
import IntroView from './intro-view';


export default class IntroPresenter extends AbstractPresenter {
  constructor() {
    super();
  }

  init() {
    const introView = new IntroView();
    introView.onAsteriskClick = () => this._onAsteriskClick();
    this.addChildren(introView);
  }

  private _onAsteriskClick() {
    App.showGreeting();
  }
}
