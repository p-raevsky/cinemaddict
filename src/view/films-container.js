import AbstractView from './abstract.js';

const createFilmsTemplate = () => {
  return `<section class="films">
  </section>`;
};

export default class FilmsContainer extends AbstractView {
  getTemplate() {
    return createFilmsTemplate();
  }
}
