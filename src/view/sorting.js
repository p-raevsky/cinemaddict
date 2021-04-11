import {createElement} from '../util.js';

const SORT_TYPES = [
  'Sort by default',
  'Sort by date',
  'Sort by rating',
];

const sortTypesTemplate = (sortItem, isActive) => {
  return `<a href="#" class="sort__button ${isActive ? 'sort__button--active' : ''}">
      ${sortItem}
    </a>
  </li>`;
};

const createSortingTemplate = () => {
  const createSortMenu = SORT_TYPES
    .map((sortTemplate, index) => sortTypesTemplate(sortTemplate, index === 0))
    .join('');

  return `<ul class="sort">
    ${createSortMenu}
  </ul>`;
};

export default class Sorting {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortingTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
