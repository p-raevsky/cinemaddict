import {MenuItem} from '../const.js';
import AbstractView from './abstract.js';

const createFilterTemplate = (filter, currentMenuItemType) => {
  const {type, name, count} = filter;

  return `<a href="#${name.toLowerCase()}"
    class="main-navigation__item ${type === currentMenuItemType ? 'main-navigation__item--active' : ''}"
    data-type ="${type}">
    ${name === MenuItem.ALL_MOVIES
    ? MenuItem.ALL_MOVIES
    : `${name} <span class="main-navigation__item-count">${count} </span>`}
  </a>`;
};

const createMenuTemplate = (filterItems, currentMenuItemType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterTemplate(filter, currentMenuItemType))
    .join('');

  return `<div class="main-navigation__items">
    ${filterItemsTemplate}
  </div>`;
};

export default class Filter extends AbstractView {
  constructor(filters, currentMenuItemType) {
    super();
    this._filters = filters;
    this._currentFilter = currentMenuItemType;
    this._menuItemClickHandler = this._menuItemClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._filters, this._currentFilter);
  }

  _menuItemClickHandler(evt) {
    if (evt.target.closest('.main-navigation a')) {
      const el = evt.target.closest('.main-navigation a');
      const dataType = el.dataset.type;
      evt.preventDefault();
      this._callback.menuItemClick(dataType);
    }
  }

  setMenuItemClickHandler(callback) {
    this._callback.menuItemClick = callback;
    this.getElement().addEventListener('click', this._menuItemClickHandler);
  }
}
