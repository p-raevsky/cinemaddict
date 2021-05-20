import AbstractView from './abstract.js';

const createFilmsListTemplate = () => {
  return `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container">
    </div>
  </section>`;
};

export default class FilmsList extends AbstractView {
  getTemplate() {
    return createFilmsListTemplate();
  }

  getFilmsListContainer() {
    return this.getElement().querySelector('.films-list__container');
  }
}
