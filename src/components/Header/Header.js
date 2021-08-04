import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoPath from '../../images/logo.svg';

class Header extends React.Component {

  render() {
    return (
      <header className="header header_place_landing">
        <Link to="/">
          <img alt='Логотип' src={logoPath} />
        </Link>
        <Link to="/signup" className="header__link">
          Регистрация
        </Link>
        <Link to="/signin" className="header__button">
          Войти
        </Link>
      </header>
    );
  }
}

export default Header;