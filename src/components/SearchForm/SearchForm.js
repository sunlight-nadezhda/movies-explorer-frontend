import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

class SearchForm extends React.Component {

  render() {
    return (
      <div className="search">
        <form className="search__container">
            <label htmlFor="site-search">
              <div className="search__icon"></div>
            </label>
            <input type="search" id="site-search" name="site-search" placeholder="Фильм" className="search__input" />
            <input type="submit" value="" className="search__submit" />
            <FilterCheckbox />
          </form>
        <hr className="search__line" />
      </div>
    );
  }
}

export default SearchForm;
