import HeaderView from './header-view';
import intro from './intro';
import renderGame from './game';
import RulesView from './rules-view';
import utils from '../utils/utils';
import {INITIAL_STATE} from '../data/game-data';


const rulesView = new RulesView();
const headerView = new HeaderView(INITIAL_STATE, false);

rulesView.onEnterDocument = () => rulesView.input.focus();

rulesView.onBlurHandler = () => setTimeout(() => rulesView.input.focus(), 100);

rulesView.onInputHandler = (evt) => {
  rulesView.switchButton(evt.target.value.trim().length > 0);
};

rulesView.onSubmitHandler = (evt) => {
  evt.preventDefault();
  rulesView.resetInput();
  renderGame(INITIAL_STATE);
};

headerView.onBackClick = () => {
  intro();
};

export default () => {
  utils.addChildren(headerView, rulesView);
};
