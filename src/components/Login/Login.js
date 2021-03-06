import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logoPath from '../../images/logo.svg';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useFormWithValidation } from '../../utils/useFormWithValidation';

const Login = (props) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputEmail = (event) => {
    setEmail(event.target.value);
  }

  const handleInputPassword = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onLogin({
      email: values['login-email'],
      password: values['login-pass'],
    });
    resetForm();
    setEmail('');
    setPassword('');
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <Link to="/" className="logo-inAuth">
        <img alt='Логотип' src={logoPath} />
      </Link>

      <h1 className="login__greeting">Рады видеть!</h1>

      <label htmlFor="login-email" className="login__label">E-mail</label>
      <input
        type="email"
        id="login-email"
        name="login-email"
        placeholder="E-mail"
        value={email}
        className="login__input login__email-input"
        required
        onInput={handleInputEmail}
        onChange={handleChange}
      />

      <label htmlFor="login-pass" className="login__label">Пароль</label>
      <input
        type="password"
        id="login-pass"
        name="login-pass"
        placeholder="Пароль"
        value={password}
        className="login__input login__pass-input"
        required
        onInput={handleInputPassword}
        onChange={handleChange}
      />

      {!Object.keys(errors).length
        ? ''
        : Object.entries(errors)
          .map(([errKey, errValue]) => (
            <ErrorMessage key={errKey} text={errValue} isErrorVisible={true} />
          ))}

      <ErrorMessage text={props.errorText} isErrorVisible={props.isErrorVisible} />

      <input
        type="submit"
        value="Войти"
        className={`login__sign-button${!isValid
          ? ' login__sign-button_disabled'
          : ''}`}
        disabled={!isValid}
      />

      <div className="login__reg-block">
        <span className="login__reg-text">Ещё не зарегистрированы?</span>
        <Link to="/signup" className="login__reg-link">Регистрация</Link>
      </div>
    </form>
  );
}

export default Login;
