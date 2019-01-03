import Utils from './utils';
import Question from '../data/question';
import Stat from '../data/stat';


export default class Loader {
  static DEFAULT_USER_NAME: string = `unknown`;
  static QUESTIONS_URL: string = `https://es.dump.academy/pixel-hunter/questions`;
  static APP_ID: string = `125911`;

  /**
   * @return {Promise<Array<Question>>}
   * @static
   */
  static async loadQuestions() {
    const response = await fetch(Loader.QUESTIONS_URL);
    const checkedResponse = this._checkStatus(response);
    const data = await checkedResponse.json();
    return Utils.parseArray(data, Question.parse);
  }

  /**
   * @param {GameData.StateDataType} state
   * @param {string} username
   * @return {Promise<Response>}
   * @static
   */
  static async sendResults(state, username = Loader.DEFAULT_USER_NAME) {
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

    const response = await fetch(url, requestSettings);
    this._checkStatus(response);
    return response;
  }

  /**
   * @param {string} username
   * @return {Promise}
   * @static
   */
  static async loadResults(username = Loader.DEFAULT_USER_NAME) {
    const url = this._getResultsUrl(username);
    const response = await fetch(url);
    this._checkStatus(response);
    const rawData = await response.json();
    const stats = Utils.parseArray(rawData, Stat.parse);
    return stats.reverse();
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
