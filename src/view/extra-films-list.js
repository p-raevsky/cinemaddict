import {createElement} from '../util.js';

const BLANK_TITLE = 'Top rated';

const createExtraFilmsListTemplate = (title = BLANK_TITLE) => {
  return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container">
    </div>
  </section>`;
};

export default class ExtraFilmsList {
  constructor(title = BLANK_TITLE) {
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return createExtraFilmsListTemplate(this._title);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
