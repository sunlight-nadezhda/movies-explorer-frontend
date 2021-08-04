import React from 'react';
import './AboutProject.css';

class AboutProject extends React.Component {

  render() {
    return (
      <section className="section about-project">
        <h2 className="section__title">О проекте</h2>
        <div className="about-project__description">
          <h3 className="about-project__description-tile">
            Дипломный проект включал 5 этапов
          </h3>
          <h3 className="about-project__description-tile">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__description-info">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
          <p className="about-project__description-info">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
        <div className="about-project__ratio">
          <p className="about-project__ratio-time about-project__ratio-time_color_black">1 неделя</p>
          <p className="about-project__ratio-time about-project__ratio-time_color_gray">4 недели</p>
          <p className="about-project__ratio-name">Back-end</p>
          <p className="about-project__ratio-name">Front-end</p>
        </div>
      </section>
    );
  }
}

export default AboutProject;