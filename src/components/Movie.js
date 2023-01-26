import React from 'react';

import classes from './Movie.module.css';
import Button from './Button';

const Movie = (props) => {

  
  
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <Button id = {props.id} removeMovie= {props.updateMovie}>Delete</Button>
    </li>
  );
};

export default Movie;
