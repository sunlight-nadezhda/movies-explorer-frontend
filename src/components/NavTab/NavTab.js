import React from 'react';
import { Link } from 'react-router-dom';
import './NavTab.css';
import logoPath from '../../images/logo.svg';

class NavTab extends React.Component {

  render() {
    return (
      <nav className="nav-tab nav-tab_place_landing">
        <Link to="/">
          <img alt='Логотип' src={logoPath} />
        </Link>
        <Link to="/signup" className="nav-tab__link">
          Регистрация
        </Link>
        <Link to="/signin" className="nav-tab__button">
          Войти
        </Link>
      </nav>
    );
  }
}

export default NavTab;