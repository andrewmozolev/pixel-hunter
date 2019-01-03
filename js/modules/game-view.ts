import AbstractView from '../utils/abstract-view';
import Option, {OptionType} from '../data/option';
import Question, {QuestionType} from '../data/question';
import Utils from '../utils/utils';
import {Setting} from '../utils/settings';


export enum GameViewClassName {
  GAME_ANSWER = 'game__answer',
  GAME_CONTENT = 'game__content',
  GAME_IMAGE = 'game__image',
  GAME_OPTION = 'game__option',
};

interface GameView {
  onFormChangeHandler(): void;
  onFormClickHandler(evt: Event): void;
}

class GameView extends AbstractView {
  private _question: Question;
  private _form: Element;
  readonly _correctType: string;
  private _inputsElements: Array<HTMLInputElement>;
  private _optionsElements: Array<Element>;

  constructor(question: Question, correctType: string) {
    super();

    this._question = question;

    this._correctType = correctType;
  }


  get form(): Element {
    return this._form;
  }

  get template() {
    const formClassName = Utils.className(GameViewClassName.GAME_CONTENT,
        this._question.type === QuestionType.TINDER_LIKE, `wide`,
        this._question.type === QuestionType.ONE_OF_THREE, `triple`);

    return `
        <section class="game">
          <p class="game__task">${this._question.title}</p>
          <form class="${formClassName}">
            ${this._question.options.map(this._getOption.bind(this)).join(``)}
          </form>
        </section>`;
  }

  bind() {
    this._form = <Element> this.element.querySelector(`.${GameViewClassName.GAME_CONTENT}`);
    this._form.addEventListener(`click`, (evt) => this.onFormClickHandler(evt));
    this._form.addEventListener(`change`, () => this.onFormChangeHandler());
  }

  public getInputsElements(): Array<HTMLInputElement> {
    if (!this._inputsElements) {
      this._inputsElements = [...this._form.querySelectorAll(`input`)];
    }
    return this._inputsElements;
  }

  public getOptionsElements(): Array<Element> {
    if (!this._optionsElements) {
      this._optionsElements =
        [...this._form.querySelectorAll(`.${GameViewClassName.GAME_OPTION}`)];
    }
    return this._optionsElements;
  }

  public getPreciseImage(index: number): HTMLImageElement {
    const option = this._getPreciseOption(index);
    return <HTMLImageElement> option.querySelector(`.${GameViewClassName.GAME_IMAGE}`);
  }

  public getPreciseImageCheckedInput(index: number): HTMLInputElement {
    const option = this._getPreciseOption(index);
    return <HTMLInputElement> option.querySelector(`input:checked`);
  }

  private _getOption(option: Option, index: number): string {
    const optionClassName = Utils.className(GameViewClassName.GAME_OPTION,
        Setting.DEBUG && option.type === this._correctType, `correct`);

    const optionAsImage = `<div class="${optionClassName}">
        <img class="${GameViewClassName.GAME_IMAGE}" src="${option.image.url}" alt="Option ${index + 1}" width="304" height="455">
    </div>`;

    const photoLabelClassName = Utils.className(GameViewClassName.GAME_ANSWER,
        true, `photo`,
        Setting.DEBUG && option.type === OptionType.PHOTO, `correct`);
    const paintingLabelClassName = Utils.className(GameViewClassName.GAME_ANSWER,
        true, `painting`,
        Setting.DEBUG && option.type === OptionType.PAINTING, `correct`);

    const optionWithButtons = `<div class="${GameViewClassName.GAME_OPTION}">
      <img class="${GameViewClassName.GAME_IMAGE}" src="${option.image.url}" alt="Option ${index + 1}" width="468" height="458">
      <label class="${photoLabelClassName}">
        <input class="visually-hidden" name="question${index + 1}" type="radio" value="${OptionType.PHOTO}">
        <span>Фото</span>
      </label>
      <label class="${paintingLabelClassName}">
        <input class="visually-hidden" name="question${index + 1}" type="radio" value="${OptionType.PAINTING}">
        <span>Рисунок</span>
      </label>
    </div>`;

    return this._question.type === QuestionType.ONE_OF_THREE ?
      optionAsImage : optionWithButtons;
  }

  private _getPreciseOption(index: number): Element {
    return this.getOptionsElements()[index];
  }
}

export default GameView;
