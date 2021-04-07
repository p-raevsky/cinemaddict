const NOVICE_USER_NAME = 'Novice';
const FAN_USER_NAME = 'Fan';
const MOVIE_BUF_USER_NAME = 'Movie Buff';

export const createProfileTemplate = (watchedMovies) => {
  let userName = NOVICE_USER_NAME;
  const moviesCount = watchedMovies.length;

  if (!watchedMovies) {
    return '';
  }

  moviesCount > 10 && moviesCount <= 20
    ? userName = FAN_USER_NAME
    : moviesCount > 20
      ? userName = MOVIE_BUF_USER_NAME
      : userName = NOVICE_USER_NAME;

  return `<section class="header__profile profile">
    <p class="profile__rating">${userName}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};
