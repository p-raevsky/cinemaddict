import AbstractView from './abstract.js';

const createProfileTemplate = (rankName) => {
  return `<section class="header__profile profile">
    <p class="profile__rating">${rankName}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class Profile extends AbstractView {
  constructor(rankName) {
    super();
    this._rankName = rankName;
  }

  getTemplate() {
    return createProfileTemplate(this._rankName);
  }
}
