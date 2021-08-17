import React from 'react';
import { Link } from 'react-router-dom';
import './Account.css';

const Account = (props) => {
  return (
    <Link to="/profile"
      className={`account${props.show ? ' account_menu' : ''}`}
      onClick={props.onCloseMenu}
    >
      <div className="account__text">Аккаунт</div>
      <div className="account__icon"></div>
    </Link>
  );
}

export default Account;
