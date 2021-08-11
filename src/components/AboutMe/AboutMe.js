import React from 'react';
import './AboutMe.css';
import photoPath from '../../images/photo.jpg';
import arrowPath from '../../images/arrow.svg';

class AboutMe extends React.Component {

  render() {
    return (
      <section className="section about-me">
        <h2 className="section__title">Студент</h2>
        <div className="about-me__description">
          <div className="about-me__text">
            <h3 className="about-me__name">Виталий</h3>
            <h4 className="about-me__about">Фронтенд-разработчик, 30 лет</h4>
            <p className="about-me__info">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <div className="about-me__social">
              <a href="https://www.facebook.com/" className="about-me__social-item" target="_blank"
          rel="noopener noreferrer">Facebook</a>
              <a href="https://github.com/" className="about-me__social-item" target="_blank"
          rel="noopener noreferrer">Github</a>
            </div>
          </div>
          <img alt='Фото студента' src={photoPath} className="about-me__image" />
        </div>
        <h5 className="about-me__portfolio-title">Портфолио</h5>
        <a href="https://github.com/" className="about-me__portfolio-item" target="_blank"
          rel="noopener noreferrer">
          <div className="about-me__portfolio-name">Статичный сайт</div>
          <img alt='Стрелка' src={arrowPath} />
        </a>
        <a href="https://github.com/" className="about-me__portfolio-item" target="_blank"
          rel="noopener noreferrer">
          <div className="about-me__portfolio-name">Адаптивный сайт</div>
          <img alt='Стрелка' src={arrowPath} />
        </a>
        <a href="https://github.com/" className="about-me__portfolio-item" target="_blank"
          rel="noopener noreferrer">
          <div className="about-me__portfolio-name">Одностраничное приложение</div>
          <img alt='Стрелка' src={arrowPath} />
        </a>
      </section>
    );
  }
}

export default AboutMe;
