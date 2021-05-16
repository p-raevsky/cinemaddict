import FooterStatisticView from '../view/footer-statistic.js';
import {remove, render, replace}  from '../utils/render.js';

export default class FooterStatistic {
  constructor(container, moviesModel, totalMoviesCount) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._totalMoviesCount = totalMoviesCount;

    this._footerStatisticComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFooterStatistic();
  }

  _handleModelEvent() {
    this.init();
  }

  _getMovies() {
    return this._moviesModel.get().slice();
  }

  _renderFooterStatistic() {
    if (!this._getMovies().length) {
      this._totalMoviesCount = 0;
    }

    const prevFooterStatisticComponent = this._footerStatisticComponent;
    this._footerStatisticComponent = new FooterStatisticView(this._totalMoviesCount);

    if (prevFooterStatisticComponent === null) {
      return render(this._container, this._footerStatisticComponent);
    }

    replace(this._footerStatisticComponent, prevFooterStatisticComponent);
    remove(prevFooterStatisticComponent);
  }

  destroy() {
    remove(this._footerStatisticComponent);
  }
}
