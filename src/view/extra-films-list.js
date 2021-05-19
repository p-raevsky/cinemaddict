import AbstractView from './abstract.js';

const BLANK_TITLE = 'Top rated';

const createExtraFilmsListTemplate = (title = BLANK_TITLE) => {
  return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container">
    </div>
  </section>`;
};

export default class ExtraFilmsList extends AbstractView {
  constructor(title = BLANK_TITLE) {
    super();
    this._title = title;
  }

  getTemplate() {
    return createExtraFilmsListTemplate(this._title);
  }

  getFilmsListContainer() {
    return this.getElement().querySelector('.films-list--extra .films-list__container');
  }
}
