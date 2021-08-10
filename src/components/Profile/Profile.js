import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';

class Profile extends React.Component {

  render() {
    return (
      <div className="page">
        <Header
          loggedIn={this.props.loggedIn}
        />
        <main>
          <section className="profile">
            <h1 className="profile__greetings">Привет, Виталий!</h1>
            <form className="profile__container">
              <label htmlFor="profile-name" className="profile__label">
                Имя
                <input type="text" id="profile-name" name="profile-name" placeholder="Имя" className="profile__name-input" />
              </label>
              <hr className="profile__line" />
              <label htmlFor="profile-email" className="profile__label">
                E-mail
                <input type="text" id="profile-email" name="profile-email" placeholder="Почта" className="profile__email-input" />
              </label>
              <input type="submit" value="Редактировать" className="profile__edit-button" />
              <Link to="/signout" className="profile__link">Выйти из аккаунта</Link>
            </form>
          </section>
        </main>
      </div>
    );
  }
}

export default Profile;

