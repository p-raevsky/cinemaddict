import FooterStatisticView from '../view/footer-statistic.js';
import {render}  from '../utils/render.js';

export default class FooterStatistic {
  constructor(container) {
    this._container = container;
    this._footerStatisticComponent = null;
  }

  init(generalCount) {
    this._footerStatisticComponent = new FooterStatisticView(generalCount);

    render(this._container, this._footerStatisticComponent);
  }
}
