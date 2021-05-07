import StatisticView from '../view/statistic.js';
import {render, remove, replace}  from '../utils/render.js';

export default class Statistic {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._statisticComponent = null;
  }

  init() {
    const prevStatisticComponent = this._statisticComponent;
    this._statisticComponent = new StatisticView(this._getMovies);

    if (prevStatisticComponent === null) {
      return render(this._container, this._statisticComponent);
    }

    replace(this._statisticComponent, prevStatisticComponent);
    remove(prevStatisticComponent);
  }

  _getMovies() {
    return this._moviesModel.get().slice();
  }

  show() {
    this._statisticComponent.getElement().classList.remove('visually-hidden');
  }

  hide() {
    this._statisticComponent.getElement().classList.add('visually-hidden');
  }
}
