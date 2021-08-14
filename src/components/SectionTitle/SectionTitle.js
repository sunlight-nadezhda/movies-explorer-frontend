import React from 'react';
import './SectionTitle.css';

class SectionTitle extends React.Component {

  render() {
    return (
      <h2 className="section__title">{this.props.title}</h2>
    );
  }
}

export default SectionTitle;
