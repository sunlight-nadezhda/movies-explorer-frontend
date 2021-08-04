import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

class Footer extends React.Component {

  render() {
    return (
      <footer className="footer">
        <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className="footer__info">
          <div className="footer__copyright">&copy; 2020</div>
          <div className="footer__links">
            <a href="https://praktikum.yandex.ru/" className="footer__link" target="_blank"
          rel="noopener noreferrer">Яндекс.Практикум</a>
            <Link to="#" className="footer__link">Github</Link>
            <Link to="#" className="footer__link">Facebook</Link>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
