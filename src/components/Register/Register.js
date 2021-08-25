import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logoPath from '../../images/logo.svg';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useFormWithValidation } from '../../utils/useFormWithValidation';

const Register = (props) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister({
      name: values['register-name'],
      email: values['register-email'],
      password: values['register-pass'],
    });
    resetForm();
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <Link to="/" className="logo-inAuth">
        <img alt='Логотип' src={logoPath} />
      </Link>

      <h1 className="register__greeting">Добро пожаловать!</h1>

      <label htmlFor="register-name" className="register__label">Имя</label>
      <input
        type="text"
        id="register-name"
        name="register-name"
        placeholder="Имя"
        className="register__input register__name-input"
        required
        minLength="2"
        maxLength="30"
        // pattern={/[a-zа-я \-]{2,30}/gi}
        onInput={handleChange}
      />

      <label htmlFor="register-email" className="register__label">E-mail</label>
      <input
        type="email"
        id="register-email"
        name="register-email"
        placeholder="E-mail"
        className="register__input register__email-input"
        required
        onInput={handleChange}
      />

      <label htmlFor="register-pass" className="register__label">Пароль</label>
      <input
        type="password"
        id="register-pass"
        name="register-pass"
        placeholder="Пароль"
        className="register__input register__pass-input"
        required
        onInput={handleChange}
      />

      {!Object.keys(errors).length
        ? ''
        : Object.entries(errors)
          .map(([errKey, errValue]) => (
            <ErrorMessage key={errKey} text={errValue} />
          ))}

      <ErrorMessage text={props.errorText} />

      <input
        type="submit"
        value="Зарегистрироваться"
        className={`register__sign-button${!isValid
          ? ' register__sign-button_disabled'
          : ''}`}
        disabled={!isValid}
      />

      <div className="register__login-block">
        <span className="register__login-text">Уже зарегистрированы?</span>
        <Link to="/signin" className="register__login-link">Войти</Link>
      </div>
    </form>
  );
}

export default Register;
