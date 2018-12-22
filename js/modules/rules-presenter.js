import AbstractPresenter from '../utils/abstract-presenter';
import App from '../app';
import HeaderView from './header-view';
import RulesView from './rules-view';


export default class RulesPresenter extends AbstractPresenter {
  constructor() {
    super();

    /** @private {RulesView} */
    this._rulesView = null;
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

  /** @private */
  _onBlurHandler() {
    setTimeout(() => this._rulesView.input.focus(), RulesPresenter.FOCUS_DELAY);
  }

  /** @private */
  _onInputHandler() {
    this._rulesView.switchButton(this._rulesView.value.trim().length > 0);
  }

  /**
   * @param {Event} evt
   * @private
   */
  _onSubmitHandler(evt) {
    evt.preventDefault();
    App.showGame(this._rulesView.value);
    this._rulesView.resetInput();
  }
}

/** @const {number} */
RulesPresenter.FOCUS_DELAY = 100;
