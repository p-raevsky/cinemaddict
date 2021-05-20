import {MenuItem} from '../const.js';
import AbstractView from './abstract.js';

const createSiteMenuTemplate = (currentMenuItemType) => {
  return `<nav class="main-navigation">
    <a href="#stats"
      class="main-navigation__additional${currentMenuItemType === MenuItem.STATISTICS ? ' main-navigation__additional--active' : ''}"
      data-type ="${MenuItem.STATISTICS}">
      Stats
    </a>
  </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(currentMenuItemType) {
    super();
    this._currentMenuItemType = currentMenuItemType;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._currentMenuItemType);
  }

  addActiveBtnState() {
    this.getElement()
      .querySelector('.main-navigation__additional')
      .classList.add('main-navigation__additional--active');
  }

  removeActiveBtnState() {
    this.getElement()
      .querySelector('.main-navigation__additional')
      .classList.remove('main-navigation__additional--active');
  }
}
