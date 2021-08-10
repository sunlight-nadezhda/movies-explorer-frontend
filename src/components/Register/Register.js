import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logoPath from '../../images/logo.svg';

class Register extends React.Component {

  render() {
    return (
      <div className="register">
        <Link to="/" className="logo-inAuth">
          <img alt='Логотип' src={logoPath} />
        </Link>

        <h1 className="register__greeting">Добро пожаловать!</h1>

        <label htmlFor="register-name" className="register__label">Имя</label>
        <input type="text" id="register-name" name="register-name" className="register__input register__name-input" />

        <label htmlFor="register-email" className="register__label">E-mail</label>
        <input type="email" id="register-email" name="register-email" className="register__input register__email-input" />

        <label htmlFor="register-pass" className="register__label">Пароль</label>
        <input type="password" id="register-pass" name="register-pass" className="register__input register__pass-input" />

        <div className="register__error-message">Что-то пошло не так...</div>

        <input type="submit" value="Зарегистрироваться" className="register__sign-button" />

        <div className="register__login-block">
          <span className="register__login-text">Уже зарегистрированы?</span>
          <Link to="/signin" className="register__login-link">Войти</Link>
        </div>
      </div>
    );
  }
}

export default Register;
