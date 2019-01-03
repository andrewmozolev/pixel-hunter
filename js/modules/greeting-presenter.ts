import AbstractPresenter from '../utils/abstract-presenter';
import App from '../app';
import GreetingView from './greeting-view';


export default class GreetingPresenter extends AbstractPresenter {
  constructor() {
    super();
  }

  public init() {
    const greetingView = new GreetingView();
    greetingView.onArrowClick = () => this._onArrowClick();
    this.addChildren(greetingView);
  }

  private _onArrowClick() {
    App.showRules();
  }
}
