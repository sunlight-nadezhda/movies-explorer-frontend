import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const SearchForm = (props) => {
  const [searchedFilm, setSearchedFilm] = useState('');
  const [showError, setShowError] = useState(false);

  const getSearchedFilm = (e) => {
    setSearchedFilm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!!searchedFilm) props.onGetFilms();

    setShowError(!searchedFilm);
  };

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
        <input type="search" id="site-search" name="site-search" value={searchedFilm} placeholder="Фильм" className="search__input" onChange={getSearchedFilm} required />
        <input type="submit" value="" className="search__submit" />
        <FilterCheckbox />
      </form>
      <ErrorMessage text="Нужно ввести ключевое слово" showError={showError} />
      <hr className="search__line" />
    </section>
  );
}

export default SearchForm;
