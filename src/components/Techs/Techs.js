import React from 'react';
import './Techs.css';
import SectionTitle from '../SectionTitle/SectionTitle';

class Techs extends React.Component {

  render() {
    return (
      <section className="techs">
        <SectionTitle title="Технологии" />
        <h3 className="techs__name">7 технологий</h3>
        <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className="techs__technologies">
          <div className="techs__technology">HTML</div>
          <div className="techs__technology">CSS</div>
          <div className="techs__technology">JS</div>
          <div className="techs__technology">React</div>
          <div className="techs__technology">Git</div>
          <div className="techs__technology">Express.js</div>
          <div className="techs__technology">mongoDB</div>
        </div>
      </section>
    );
  }
}

export default Techs;