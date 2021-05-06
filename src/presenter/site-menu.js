import SiteMenuView from '../view/site-menu.js';
import {render, replace, remove} from '../utils/render.js';
import {filter} from '../utils/filter.js';
import {FILTER, UpdateType} from '../const.js';
export default class SiteMenu {
  constructor(container, filterModel, moviesModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._moviesModel = moviesModel;

    this._siteMenuComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeClick = this._handleFilterTypeClick.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._siteMenuComponent;

    this._siteMenuComponent = new SiteMenuView(filters, this._filterModel.get());
    this._siteMenuComponent.setFilterTypeClickHandler(this._handleFilterTypeClick);

    if (prevFilterComponent === null) {
      render(this._container, this._siteMenuComponent);

      return;
    }

    replace(this._siteMenuComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeClick(filterType) {
    if (this._filterModel.get() === filterType) {
      return;
    }

    this._filterModel.set(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const movies = this._moviesModel.get();

    return [
      {
        type: FILTER.ALL_MOVIES,
        name: 'All movies',
        count: filter[FILTER.ALL_MOVIES](movies).length,
      },
      {
        type: FILTER.WATHCLIST,
        name: 'Watchlist',
        count: filter[FILTER.WATHCLIST](movies).length,
      },
      {
        type: FILTER.FAVOURITES,
        name: 'Favorites',
        count: filter[FILTER.FAVOURITES](movies).length,
      },
      {
        type: FILTER.HISTORY,
        name: 'History',
        count: filter[FILTER.HISTORY](movies).length,
      },
    ];
  }
}
