import React from 'react';
import './AboutMe.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import photoPath from '../../images/myphoto.jpg';
import arrowPath from '../../images/arrow.svg';

const AboutMe = () => {
  return (
    <section className="section about-me">
      <SectionTitle title="Студент" />
      <div className="about-me__description">
        <div className="about-me__text">
          <h3 className="about-me__name">Надежда</h3>
          <h4 className="about-me__about">Фронтенд-разработчик, 35 лет</h4>
          <p className="about-me__info">
            Я родилась и живу в Симферополе, закончила факультет математики и информатики ТНУ им. В.И. Вернадского. У меня есть муж и сын. Я люблю слушать музыку, а ещё увлекаюсь гимнастикой. Недавно начала программировать. С 2008 года занималась анализом данных. 2020 - 2021 гг. прошла курс по веб-разработке под присмотром опытных наставников.
          </p>
          <div className="about-me__social">
            <a href="http://github.com/sunlight-nadezhda" className="about-me__social-item" target="_blank"
              rel="noopener noreferrer">Github</a>
          </div>
        </div>
        <img alt='Фото студента' src={photoPath} className="about-me__image" />
      </div>
      <h5 className="about-me__portfolio-title">Портфолио</h5>
      <a href="https://sunlight-nadezhda.github.io/how-to-learn/index.html" className="about-me__portfolio-item" target="_blank"
        rel="noopener noreferrer">
        <div className="about-me__portfolio-name">Статичный сайт</div>
        <img alt='Стрелка' src={arrowPath} />
      </a>
      <a href="https://sunlight-nadezhda.github.io/russian-travel/index.html" className="about-me__portfolio-item" target="_blank"
        rel="noopener noreferrer">
        <div className="about-me__portfolio-name">Адаптивный сайт</div>
        <img alt='Стрелка' src={arrowPath} />
      </a>
      <a href="https://github.com/sunlight-nadezhda/react-mesto-api-full" className="about-me__portfolio-item" target="_blank"
        rel="noopener noreferrer">
        <div className="about-me__portfolio-name">Одностраничное приложение</div>
        <img alt='Стрелка' src={arrowPath} />
      </a>
    </section>
  );
}

export default AboutMe;
