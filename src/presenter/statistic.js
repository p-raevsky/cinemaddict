import StatisticView from '../view/statistic.js';
import {render}  from '../utils/render.js';

export default class Statistic {
  constructor(container) {
    this._container = container;

    this._statisticComponent = new StatisticView();
  }

  init() {
    render(this._container, this._statisticComponent);
  }
}
