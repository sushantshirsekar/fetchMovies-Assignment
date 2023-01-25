import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      setError(null);
      const response = await fetch("https://swapi.dev/api/films");

      if (!response.ok) {
        throw new Error("Something went wrong...retrying");
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      
      setError(error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
      fetchMovies();
  }, [fetchMovies]);

  const clear = (event) => {
    setError(event.target.parentNode.remove());
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!loading && <MoviesList movies={movies} />}
        {!loading && movies.length === 0 && <p>Found no Movies</p>}
        {!loading && error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
        {error && <button onClick={clear}>Cancel</button>}
      </section>
    </React.Fragment>
  );
}

export default App;
