import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';
import Account from '../Account/Account';

class Menu extends React.Component {

  handleCloseByOverlay = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onCloseMenu();
    }
  };

  render() {
    return (
      <div
        className={`menu${this.props.isOpen ? " menu_opened" : ''}`}
        onClick={this.handleCloseByOverlay}
      >
        <div className="menu__container">
          <button
            type="button"
            aria-label="Удалить"
            className="menu__close-button"
            onClick={this.props.onCloseMenu}
          ></button>

          <div className="menu__nav">
            <NavLink exact to="/"
              className="menu__link"
              activeClassName="menu__link_active"
              onClick={this.props.onCloseMenu}
            >
              Главная
            </NavLink>
            <NavLink to="/movies"
              className="menu__link"
              activeClassName="menu__link_active"
              onClick={this.props.onCloseMenu}
            >
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies"
              className="menu__link"
              activeClassName="menu__link_active"
              onClick={this.props.onCloseMenu}
            >
              Сохранённые фильмы
            </NavLink>
          </div>

          <Account show={this.props.isOpen} onCloseMenu={this.props.onCloseMenu} />
        </div>
      </div>
    );
  }
}

export default Menu;

