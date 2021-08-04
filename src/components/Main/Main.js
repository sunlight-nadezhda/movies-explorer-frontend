import React from 'react';
import './Main.css';
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";

class Main extends React.Component {

  render() {
    return (
      <div className="page">
        <Header />
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </div>
    );
  }
}

export default Main;
