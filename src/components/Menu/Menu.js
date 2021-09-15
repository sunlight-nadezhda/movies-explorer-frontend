import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';
import Account from '../Account/Account';

const Menu = (props) => {

  const handleCloseByOverlay = (event) => {
    if (event.target === event.currentTarget) {
      props.onCloseMenu();
    }
  };

  return (
    <div
      className={`menu${props.isOpen ? " menu_opened" : ''}`}
      onClick={handleCloseByOverlay}
    >
      <div className="menu__container">
        <button
          type="button"
          aria-label="Удалить"
          className="menu__close-button"
          onClick={props.onCloseMenu}
        ></button>

        <div className="menu__nav">
          <NavLink exact to="/"
            className="menu__link"
            activeClassName="menu__link_active"
            onClick={props.onCloseMenu}
          >
            Главная
          </NavLink>
          <NavLink to="/movies"
            className="menu__link"
            activeClassName="menu__link_active"
            onClick={props.onCloseMenu}
          >
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies"
            className="menu__link"
            activeClassName="menu__link_active"
            onClick={props.onCloseMenu}
          >
            Сохранённые фильмы
          </NavLink>
        </div>

        <Account show={props.isOpen} onCloseMenu={props.onCloseMenu} />
      </div>
    </div>
  );
}

export default Menu;

