import ProfileView from '../view/profile.js';
import {render}  from '../utils/render.js';

export default class Profile {
  constructor(container) {
    this._container = container;

    this._profileComponent = null;
  }

  init(movies) {
    this._movies = movies.slice();

    this._profileComponent = new ProfileView(this._movies);

    render(this._container, this._profileComponent);
  }
}
