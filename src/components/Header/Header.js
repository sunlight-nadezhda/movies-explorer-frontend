import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Auth from '../Auth/Auth';
import NavTab from '../NavTab/NavTab';
import logoPath from '../../images/logo.svg';

const Header = (props) => {
  return (
    <header className={`header${props.loggedIn ? '' : ' header_landing'}`}>
      <Link to="/">
        <img alt='Логотип' src={logoPath} />
      </Link>
      {props.loggedIn ? <NavTab onOpenMenu={props.onOpenMenu} /> : <Auth />}
    </header>
  );
}

export default Header;