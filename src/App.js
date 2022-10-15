import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import MovieCard from "./components/movie/MovieCard";

const App = () => {
  const PATH_URL = "https://image.tmdb.org/t/p/original";
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchKey, setSearchKey] = useState("");
  const API_URL = "https://api.themoviedb.org/3/";

  const fetchMovies = async () => {
    const {
      data: { results },
    } = await axios.get(`${API_URL}discover/tv`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
      },
    });

    setSelectedMovie(results[0]);
    setMovies(results);
  };
  const fetchMoviesSearch = async (searchKey) => {
    const {
      data: { results },
    } = await axios.get(`${API_URL}search/tv`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        query: searchKey,
      },
    });

    setSelectedMovie(results[0]);
    setMovies(results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMoviesSearch(searchKey);
  };

  return (
    <div>
      <header className="header-content">
        <h1 className="movie-title">Pelis Código C13</h1>
        <form onSubmit={searchMovies}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
      </header>
      <div className="container-movie" style={{ backgroundImage: `url(${PATH_URL}${selectedMovie.backdrop_path})` }}>
        <div className="movie-content" >
          <button className="button-trailer">Play Trailer</button>
          <h1 className="movie-title">
            {selectedMovie.name}
          </h1>
          {selectedMovie.overview
            ? <p className="description-movie">{selectedMovie.overview}</p>
            : null}
        </div>
      </div>
      <div className="container-movies">
        {movies.map((movie) => (
          <div key={movie.id}>
            <MovieCard
              movieInfo={movie} 
              selectMovie={setSelectedMovie}
              />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
