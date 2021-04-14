import AbstractView from './abstract.js';

const createFooterStatisticTemplate = (number) => {
  return `<section class="footer__statistics">
    <p>${number} movies inside</p>
  </section>`;
};

export default class FooterStatistic extends AbstractView {
  constructor(statisticCount) {
    super();
    this._statisticCount = statisticCount;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._statisticCount);
  }
}
