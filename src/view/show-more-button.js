import AbstractView from './abstract.js';

const createShowMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more
  </button>`;
};

export default class ShowMoreButton extends AbstractView {
  constructor() {
    super();
    this._showMoreButtonClickHandler = this._showMoreButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  _showMoreButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.showMoreBtnClick();
  }

  setShowMoreButtonClicHandler(callback) {
    this._callback.showMoreBtnClick = callback;
    this.getElement()
      .addEventListener('click', this._showMoreButtonClickHandler);
  }
}
