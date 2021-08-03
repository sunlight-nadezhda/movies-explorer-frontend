import React from 'react';
import './Main.css';
import NavTab from "../NavTab/NavTab";
import Promo from "../Promo/Promo";

class Main extends React.Component {

  render() {
    return (
      <div className="page">
        <NavTab />
        <Promo />
      </div>
    );
  }
}

export default Main;
