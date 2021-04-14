import {FILTER} from '../filter.js';
import AbstractView from './abstract.js';

const createFilterItemTemplate = (filter, isActive) => {
  const {name, count} = filter;

  return `<a href="#${name.toLowerCase()}"
    class="main-navigation__item ${isActive ? 'main-navigation__item--active' : ''}">
    ${name === FILTER.ALL_MOVIES
    ? FILTER.ALL_MOVIES
    : `${name} <span class="main-navigation__item-count">${count} </span>`}
  </a>`;
};

const createMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }
}