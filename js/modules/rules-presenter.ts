import AbstractPresenter from '../utils/abstract-presenter';
import App from '../app';
import HeaderView from './header-view';
import RulesView from './rules-view';


export default class RulesPresenter extends AbstractPresenter {
  private _rulesView: RulesView;

  readonly FOCUS_DELAY: number = 100;

  constructor() {
    super();
  }

  init() {
    const headerView = new HeaderView();
    headerView.onBackClick = () => App.showGreeting();

    this._rulesView = new RulesView();
    this._rulesView.onBlurHandler = () => this._onBlurHandler();
    this._rulesView.onInputHandler = () => this._onInputHandler();
    this._rulesView.onSubmitHandler = (evt) => this._onSubmitHandler(evt);
    this._rulesView.onEnterDocument = () => this._rulesView.input.focus();

    this.addChildren(headerView, this._rulesView);
  }

  private _onBlurHandler() {
    setTimeout(() => this._rulesView.input.focus(), this.FOCUS_DELAY);
  }

  private _onInputHandler() {
    this._rulesView.switchButton(this._rulesView.value.trim().length > 0);
  }

  private _onSubmitHandler(evt: Event) {
    evt.preventDefault();
    App.showGame(this._rulesView.value);
    this._rulesView.resetInput();
  }
}
