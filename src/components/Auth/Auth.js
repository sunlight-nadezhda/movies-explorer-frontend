import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

class Auth extends React.Component {

  render() {
    return (
      <>
        <Link to="/signup" className="auth__link">
          Регистрация
        </Link>
        <Link to="/signin" className="auth__button">
          Войти
        </Link>
      </>
    );
  }
}

export default Auth;