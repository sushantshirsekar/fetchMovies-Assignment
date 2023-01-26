import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      setError(null);
      const response = await fetch(
        "https://movie-fetch-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong...retrying");
      }
      const data = await response.json();
      console.log(data);
      let movieData = [];

      for (const key in data) {
        movieData.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(movieData);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  const addMovieHandler = async (movie) => {
    const res = await fetch(
      "https://movie-fetch-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    fetchMovies();
  };

  

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const clear = (event) => {
    setError(event.target.parentNode.remove());
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {(!loading && <MoviesList movies={movies} fetchMovieHandler = {fetchMovies}> </MoviesList>)}

        {!loading && movies.length === 0 && <p>Found no Movies</p>}
        {!loading && error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
        {error && <button onClick={clear}>Cancel</button>}
      </section>
    </React.Fragment>
  );
}

export default App;
