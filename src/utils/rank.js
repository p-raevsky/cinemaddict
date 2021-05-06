import {RANK} from '../const.js';

export const rank = {
  [RANK.NOVICE]: (count) => count <= 10,
  [RANK.FAN]: (count) => count <= 20 && count > 10,
  [RANK.MOVIE_BUFF]: (count) => count > 20,
};
