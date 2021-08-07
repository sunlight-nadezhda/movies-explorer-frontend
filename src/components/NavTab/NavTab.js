import React from 'react';
import './NavTab.css';
import Account from '../Account/Account';
import Navigation from '../Navigation/Navigation';

class NavTab extends React.Component {

  render() {
    return (
      <>
        <Navigation />
        <Account />
        <button className="menu-button"></button>
      </>
    );
  }
}

export default NavTab;

