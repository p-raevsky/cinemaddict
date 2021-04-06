export const createProfileTemplate = (watchedMovies) => {
  let userName = 'Novice';
  const moviesCount = watchedMovies.length;

  if (!watchedMovies) {
    return '';
  }
  if (moviesCount > 10 && moviesCount <= 20) {
    userName = 'Fan';
  }
  if (moviesCount > 20) {
    userName = 'Movie buff';
  }

  return `<section class="header__profile profile">
    <p class="profile__rating">${userName}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};
