import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  const movieDelete = props.fetchMovieHandler;
  return (
    <ul className={classes['movies-list']}>
     
      {props.movies.map((movie) => (
        <>
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          updateMovie = {movieDelete}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />

        </>
      ))}
       
      
    </ul>
  );
};

export default MovieList;
