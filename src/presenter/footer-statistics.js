import FooterStatisticView from '../view/footer-statistic.js';
import {remove, render, replace}  from '../utils/render.js';

export default class FooterStatistics {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._totalMoviesCount = null;

    this._footerStatisticComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFooterStatistic();
  }

  _getMovies() {
    return this._moviesModel.get().slice();
  }

  _renderFooterStatistic() {
    this._totalMoviesCount = this._moviesModel.get().length;

    if (!this._totalMoviesCount) {
      this._totalMoviesCount = 0;
    }

    const prevFooterStatisticComponent = this._footerStatisticComponent;
    this._footerStatisticComponent = new FooterStatisticView(this._totalMoviesCount);

    if (prevFooterStatisticComponent === null) {
      render(this._container, this._footerStatisticComponent);
      return;
    }

    replace(this._footerStatisticComponent, prevFooterStatisticComponent);
    remove(prevFooterStatisticComponent);
  }

  _handleModelEvent() {
    this.init();
  }
}
