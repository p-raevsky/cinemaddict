import {createElement} from '../util.js';

const createFooterStatisticTemplate = (number) => {
  return `<section class="footer__statistics">
    <p>${number} movies inside</p>
  </section>`;
};

export default class FooterStatistic {
  constructor(statisticCount) {
    this._element = null;
    this._statisticCount = statisticCount;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._statisticCount);
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
