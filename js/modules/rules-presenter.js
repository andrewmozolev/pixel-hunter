import AbstractPresenter from '../utils/abstract-presenter';
import App from '../app';
import HeaderView from './header-view';
import RulesView from './rules-view';


export default class RulesPresenter extends AbstractPresenter {
  constructor() {
    super();

    this._rulesView = null;
  }

  init() {
    this._rulesView = new RulesView();
    const header = new HeaderView();

    header.onBackClick = () => App.showIntro();
    this._rulesView.onBlurHandler = () => this._onBlurHandler();
    this._rulesView.onInputHandler = (evt) => this._onInputHandler(evt);
    this._rulesView.onSubmitHandler = (evt) => this._onSubmitHandler(evt);
    this._rulesView.onEnterDocument = () => this._rulesView.input.focus();

    this.addChildren(header, this._rulesView);
  }

  _onBlurHandler() {
    setTimeout(() => this._rulesView.input.focus(), 100);
  }

  _onInputHandler(evt) {
    this._rulesView.switchButton(evt.target.value.trim().length > 0);
  }

  _onSubmitHandler(evt) {
    evt.preventDefault();
    this._rulesView.resetInput();
    App.showGame();
  }
}
