import ProfileView from '../view/profile.js';
import {remove, render, replace}  from '../utils/render.js';
import {rank} from '../utils/rank.js';

export default class Profile {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._profileComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderProfile();
  }

  _handleModelEvent() {
    this.init();
  }

  _getMovies() {
    return this._moviesModel.getMovies().slice();
  }

  _getStatus() {
    const alreadyWatchedMovies = this._getMovies().filter((movie) => movie.userDetails.isAlreadyWatched);
    const watchedMoviesAmount = alreadyWatchedMovies.length;
    const [rankName] = Object.entries(rank)
      .filter(([, rankCount]) => rankCount(watchedMoviesAmount))
      .flat();

    return rankName;
  }

  _renderProfile() {
    const prevProfileComponent = this._profileComponent;
    this._profileComponent = new ProfileView(this._getStatus());

    if (this._getMovies().length === 0) {
      return;
    }

    if (prevProfileComponent === null) {
      return render(this._container, this._profileComponent);
    }

    replace(this._profileComponent, prevProfileComponent);
    remove(prevProfileComponent);
  }

  destroy() {
    remove(this._profileComponent);
  }
}
