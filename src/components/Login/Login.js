import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logoPath from '../../images/logo.svg';

const Login = () => {
  return (
    <div className="login">
      <Link to="/" className="logo-inAuth">
        <img alt='Логотип' src={logoPath} />
      </Link>

      <h1 className="login__greeting">Рады видеть!</h1>

      <label htmlFor="login-email" className="login__label">E-mail</label>
      <input type="email" id="login-email" name="login-email" placeholder="E-mail" className="login__input login__email-input" required />

      <label htmlFor="login-pass" className="login__label">Пароль</label>
      <input type="password" id="login-pass" name="login-pass" placeholder="Пароль" className="login__input login__pass-input" required />

      <div className="login__error-message login__error-message_hide">Что-то пошло не так...</div>

      <input type="submit" value="Войти" className="login__sign-button" />

      <div className="login__reg-block">
        <span className="login__reg-text">Ещё не зарегистрированы?</span>
        <Link to="/signin" className="login__reg-link">Регистрация</Link>
      </div>
    </div>
  );
}

export default Login;
