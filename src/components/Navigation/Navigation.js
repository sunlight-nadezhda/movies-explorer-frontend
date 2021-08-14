import React from 'react';
import { NavLink  } from 'react-router-dom';
import './Navigation.css';

class Navigation extends React.Component {

  render() {
    return (
      <div className="navigation">
        <NavLink to="/movies" activeClassName="navigation__link_active" className="navigation__link">Фильмы</NavLink>
        <NavLink to="/saved-movies" activeClassName="navigation__link_active" className="navigation__link">Сохранённые фильмы</NavLink>
      </div>
    );
  }
}

export default Navigation;
