import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const SearchForm = (props) => {
  const [searchedFilm, setSearchedFilm] = useState('');
  const [showError, setShowError] = useState(false);
  const [isBeatFilm, setIsBeatFilm] = useState(true);

  const getSearchedFilm = (e) => {
    setSearchedFilm(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (!!searchedFilm) props.onGetFilms(isBeatFilm, searchedFilm, props.isSavedMoviesPage);

    setShowError(!searchedFilm);
    setSearchedFilm('');
    props.setIsBeatFilm(isBeatFilm);
    props.setKeyWord(searchedFilm);
  };

  useEffect(() => {
    setSearchedFilm(props.keyWord);
    setIsBeatFilm(isBeatFilm);
    handleSubmit();
  }, []);

  return (
    <section className="search">
      <form
        className="search__container"
        noValidate
        onSubmit={handleSubmit}
      >
        <label htmlFor="site-search">
          <div className="search__icon"></div>
        </label>
        <input
          type="search"
          id="site-search"
          name="site-search"
          value={searchedFilm}
          placeholder="Фильм"
          className="search__input"
          onChange={getSearchedFilm}
          required
        />
        <input type="submit" value="" className="search__submit" />
        <FilterCheckbox setIsBeatFilm={setIsBeatFilm} />
      </form>
      <ErrorMessage text="Нужно ввести ключевое слово" showError={showError} />
      <hr className="search__line" />
    </section>
  );
}

export default SearchForm;
