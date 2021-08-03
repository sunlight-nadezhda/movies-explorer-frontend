import React from 'react';
import './Main.css';
import NavTab from "../NavTab/NavTab";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";

class Main extends React.Component {

  render() {
    return (
      <div className="page">
        <NavTab />
        <Promo />
        <AboutProject />
      </div>
    );
  }
}

export default Main;
