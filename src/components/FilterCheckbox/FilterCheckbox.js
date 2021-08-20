import React, {useState} from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ setIsBeatFilm }) => {
  const [checkedInput, setCheckedInput] = useState(true);

  const handleToggleCheck = () => {
    setCheckedInput(!checkedInput);
    setIsBeatFilm(!checkedInput);
  };

  return (
    <div className="filter">
      <input
        type="checkbox"
        id="switch"
        className="filter__input"
        checked={checkedInput}
        onChange={handleToggleCheck}
      />
      <label htmlFor="switch" className="filter__label"></label>
      <p className="filter__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
