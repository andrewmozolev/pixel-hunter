import AbstractPresenter from '../utils/abstract-presenter';
import GreetingView from './greeting-view';
import App from '../app';


export default class GreetingPresenter extends AbstractPresenter {
  constructor() {
    super();
  }

  init() {
    const greetingView = new GreetingView();
    greetingView.onArrowClick = () => this._onArrowClick();
    this.addChildren(greetingView);
  }

  _onArrowClick() {
    App.showRules();
  }
}
