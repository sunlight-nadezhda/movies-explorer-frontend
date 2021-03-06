import React, { useEffect, useState, useContext } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import { CurrentUserContext } from '../../utils/CurrentUserContext';

const Profile = (props) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const currentUser = useContext(CurrentUserContext);

  const handleInputName = (event) => {
    setName(event.target.value.replace(/[^a-zа-я \-]{2,30}/gi, ((letter) => '')));
  }

  const handleInputEmail = (event) => {
    setEmail(event.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onEditProfile({
      name: values['profile-name'] || name,
      email: values['profile-email'] || email,
    });
    resetForm();
  };

  useEffect(() => {
    setName(currentUser ? currentUser.name : '');
    setEmail(currentUser ? currentUser.email : '');
  }, [currentUser]);

  return (
    <div className="page">
      <Header
        loggedIn={props.loggedIn}
        onOpenMenu={props.onOpenMenu}
      />
      <main>
        <section className="profile">
          <h1 className="profile__greetings">Привет, {name}!</h1>

          <form className="profile__container" onSubmit={handleSubmit}>
            <label htmlFor="profile-name" className="profile__label">
              Имя
              <input
                type="text"
                id="profile-name"
                name="profile-name"
                value={name}
                placeholder="Имя"
                className="profile__name-input"
                required minLength="2"
                maxLength="30"
                onInput={handleInputName}
                onChange={handleChange}
              />
            </label>

            <hr className="profile__line" />

            <label htmlFor="profile-email" className="profile__label">
              E-mail
              <input
                type="email"
                id="profile-email"
                name="profile-email"
                value={email}
                placeholder="E-mail"
                className="profile__email-input"
                required
                onInput={handleInputEmail}
                onChange={handleChange}
              />
            </label>

            {!Object.keys(errors).length
              ? ''
              : Object.entries(errors)
                .map(([errKey, errValue]) => (
                  <ErrorMessage key={errKey} text={errValue} isErrorVisible={true} />
                ))}

            <ErrorMessage text={props.errorText} isErrorVisible={props.isErrorVisible} />
            <div className="profile__success-message" style={{
              display: props.showSuccessMessage ? 'block' : 'none'
            }}>Профиль успешно отредактирован</div>

            <input
              type="submit"
              value="Редактировать"
              className={`profile__edit-button${!isValid &&
                (currentUser.name === name ||
                currentUser.email === email)
                ? ' profile__edit-button_disabled'
                : ''}`}
            />
          </form>

          <button className="profile__link" onClick={props.onSignOut}>Выйти из аккаунта</button>
        </section>
      </main>
    </div>
  );
}

export default Profile;

