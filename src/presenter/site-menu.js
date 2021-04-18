import SiteMenuView from '../view/site-menu.js';
import {render}  from '../utils/render.js';

export default class SiteMenu {
  constructor(container) {
    this._container = container;
    this._siteMenuComponent = null;
  }

  init(filters) {
    this._filters = filters.slice();

    this._siteMenuComponent = new SiteMenuView(this._filters);

    render(this._container, this._siteMenuComponent);
  }
}
