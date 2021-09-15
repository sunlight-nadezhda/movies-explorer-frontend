import React from 'react';
import './SectionTitle.css';

const SectionTitle = (props) => {
  return (
    <h2 className="section__title">{props.title}</h2>
  );
}

export default SectionTitle;
