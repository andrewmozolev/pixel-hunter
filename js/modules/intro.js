import greeting from './greeting.js';
import IntroView from './intro-view';
import utils from '../utils/utils';

const introView = new IntroView();
introView.onAsteriskClick = () => greeting();

export default () => {
  utils.addElement(introView.element);
};
