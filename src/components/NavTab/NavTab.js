import React from 'react';
import './NavTab.css';
import Account from '../Account/Account';
import Navigation from '../Navigation/Navigation';

const NavTab = (props) => {
  return (
    <>
      <Navigation />
      <Account />
      <button className="menu-button" onClick={props.onOpenMenu}></button>
    </>
  );
}

export default NavTab;

