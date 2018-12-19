import Utils from './utils';
import Question from '../data/question';
import Stat from '../data/stat';


export default class Loader {
  /**
   * @return {Promise<Array<Question>>}
   * @static
   */
  static loadQuestions() {
    return fetch(Loader.QUESTIONS_URL)
        .then(this._checkStatus)
        .then((response) => response.json())
        .then((rawData) => Utils.parseArray(rawData, Question.parse))
        .catch((err) => window.console.error(err));
  }

  /**
   * @param {GameData.StateDataType} state
   * @param {string} username
   * @return {Promise<Response>}
   * @static
   */
  static sendResults(state, username = Loader.DEFAULT_USER_NAME) {
    const data = {
      stats: state.answers,
      lives: state.lives
    };

    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };

    const url = this._getResultsUrl(username);

    return fetch(url, requestSettings)
        .then(this._checkStatus);
  }

  /**
   * @param {string} username
   * @return {Promise}
   * @static
   */
  static loadResults(username = Loader.DEFAULT_USER_NAME) {
    const url = this._getResultsUrl(username);
    return fetch(url)
        .then(this._checkStatus)
        .then((response) => response.json())
        .then((rawData) => Utils.parseArray(rawData, Stat.parse))
        .then((stats) => stats.reverse())
        .catch((err) => window.console.error(err));
  }

  /**
   * @param {string} username
   * @return {string}
   * @private
   */
  static _getResultsUrl(username) {
    return `https://es.dump.academy/pixel-hunter/stats/:${Loader.APP_ID}-:${username}`;
  }

  /**
   * @param {FetchEvent} response
   * @return {FetchEvent}
   * @private
   */
  static _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }
}

/** @const {string} */
Loader.DEFAULT_USER_NAME = `unknown`;

/** @const {string} */
Loader.QUESTIONS_URL = `https://es.dump.academy/pixel-hunter/questions`;

/** @const {string} */
Loader.APP_ID = `125911`;
