import GreetingView from './greeting-view';
import rules from './rules.js';
import utils from '../utils/utils';

const greetingView = new GreetingView();
greetingView.onArrowClick = () => rules();

export default () => {
  utils.addElement(greetingView.element);
};
