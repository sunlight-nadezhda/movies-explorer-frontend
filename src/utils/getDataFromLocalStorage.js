export const getFilmsFromLocalStorage = () => {
  const rawFilms = localStorage.getItem('films');
  if (!rawFilms) return null;
  try {
    return JSON.parse(rawFilms);
  } catch (err) {
    return null;
  }
};

export const getKeywordFromLocalStorage = () => {
  const rawKeyword = localStorage.getItem('keyword');
  if (!rawKeyword) return null;
  try {
    return JSON.parse(rawKeyword);
  } catch (err) {
    return null;
  }
};

export const getIsBeatFilmFromLocalStorage = () => {
  const rawIsBeatFilm = localStorage.getItem('isBeatFilm');
  if (!rawIsBeatFilm) return null;
  try {
    return JSON.parse(rawIsBeatFilm);
  } catch (err) {
    return null;
  }
};
