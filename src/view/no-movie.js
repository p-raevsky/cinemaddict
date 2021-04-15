import AbstractView from './abstract.js';

const createNoMovieTemplate = () => {
  return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>
  </section>`;
};

export default class NoMovie extends AbstractView {
  getTemplate() {
    return createNoMovieTemplate();
  }
}
