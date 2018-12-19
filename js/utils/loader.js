import Utils from './utils';
import Question from '../data/question';


export default class Loader {
  /** @return {Promise<Array<Question>>} */
  static loadQuestions() {
    return window.fetch(`https://es.dump.academy/pixel-hunter/questions`)
        .then(this._checkStatus)
        .then((response) => response.json())
        .then((rawData) => Utils.parseArray(rawData, Question.parse))
        .catch((err) => window.console.error(err));
  }

  /**
   * @param {FetchEvent} response
   * @return {FetchEvent}
   * @private
   */
  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }
}

Loader.SERVER_URL = `https://es.dump.academy/pixel-hunter/questions`;
