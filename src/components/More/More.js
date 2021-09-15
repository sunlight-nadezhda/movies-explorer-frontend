import React from 'react';
import './More.css';

const More = (props) => {
  return (
    <section className={`more ${props.displayBlock ? 'show-more' : 'hide-block'}`}>
      <button className="more__button" onClick={props.onAddCards}>Ещё</button>
    </section>
  );
}

export default More;
