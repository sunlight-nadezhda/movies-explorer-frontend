import React from 'react';
import PropTypes from 'prop-types';
import './FilterCheckbox.css';

const FilterCheckbox = ({ onChange, value }) => {
  const handleChange = () => {
    onChange(!value);
  };

  return (
    <div className="filter">
      <input
        type="checkbox"
        id="switch"
        className="filter__input"
        checked={value}
        onChange={handleChange}
      />
      <label htmlFor="switch" className="filter__label"></label>
      <p className="filter__text">Короткометражки</p>
    </div>
  );
}

FilterCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired
}

export default FilterCheckbox;
