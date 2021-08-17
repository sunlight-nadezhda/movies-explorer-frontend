import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <div className="filter">
      <input type="checkbox" id="switch" className="filter__input" />
      <label htmlFor="switch" className="filter__label" checked="checked"></label>
      <p className="filter__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
