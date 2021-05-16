import Abstract from './abstract.js';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const scrollPosition = prevElement.scrollTop;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    newElement.scrollTo(0, scrollPosition);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
