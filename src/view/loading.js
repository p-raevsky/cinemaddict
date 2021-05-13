import AbstractView from '../view/abstract.js';

const createNoMoviesTemplate = () => {
  return `<section class="films">
  <section class="films-list">
  <h2 class="films-list__title">Loading...</h2>
  </section>
  </section>`;
};

export default class extends AbstractView {
  getTemplate() {
    return createNoMoviesTemplate();
  }
}
