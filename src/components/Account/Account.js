import React from 'react';
import { Link } from 'react-router-dom';
import './Account.css';

class Account extends React.Component {

  render() {
    return (
      <Link to="/profile" className="account">
        <div className="account__text">Аккаунт</div>
        <div className="account__icon"></div>
      </Link>
    );
  }
}

export default Account;
