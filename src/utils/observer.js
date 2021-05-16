export default class Observer {
  constructor() {
    this._observers = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(observer) {
    this._observers = this._observers.filter((existedObserver) => existedObserver !== observer);
  }

  _notify(event, firstPayload, secondPayload) {
    this._observers.forEach((observer) => observer(event, firstPayload, secondPayload));
  }
}
