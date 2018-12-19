import AbstractPresenter from '../utils/abstract-presenter';
import App from '../app';
import IntroView from './intro-view';


export default class IntroPresenter extends AbstractPresenter {
  constructor() {
    super();
  }

  /** @inheritDoc */
  init() {
    const introView = new IntroView();
    introView.onAsteriskClick = () => this._onAsteriskClick();
    this.addChildren(introView);
  }

  /** @inheritDoc */
  _onAsteriskClick() {
    App.showGreeting();
  }
}
