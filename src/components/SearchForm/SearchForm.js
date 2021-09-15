import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const SearchForm = (props) => {
  const {
    initialKeyword,
    isBeatFilm,
    onIsBeatFilmChanged,
    onSubmit,
  } = props;

  const [keyword, setKeyword] = useState(initialKeyword);

  const [hasError, setHasError] = useState(false);

  const handleInput = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasError(!keyword);
    if (!!keyword) onSubmit(keyword);
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
        <input
          type="search"
          id="site-search"
          name="site-search"
          value={keyword}
          placeholder="Фильм"
          className="search__input"
          onChange={handleInput}
          required
        />
        <input type="submit" value="" className="search__submit" />
        <FilterCheckbox value={isBeatFilm} onChange={onIsBeatFilmChanged} />
      </form>
      <ErrorMessage text="Нужно ввести ключевое слово" isErrorVisible={hasError} />
      <hr className="search__line" />
    </section>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onIsBeatFilmChanged: PropTypes.func.isRequired,
  initialKeyword: PropTypes.string,
  initialIsBeatFilm: PropTypes.bool,
};

SearchForm.defaultProps = {
  initialKeyword: '',
  initialIsBeatFilm: true,
};

export default SearchForm;
