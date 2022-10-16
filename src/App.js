import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header/Header";
import Movies from "./components/Movies/Movies";
import TrailerContainer from "./components/TrailerContainer/TrailerContainer";
import "./App.css";

const App = () => {
  const API_URL = "https://api.themoviedb.org/3/";
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchKey, setSearchKey] = useState("");
  const [playTrailer, setPlayTrailer] = useState(false);

  const fetchMovies = async () => {
    const {
      data: { results },
    } = await axios.get(`${API_URL}discover/tv`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
      },
    });

    // setSelectedMovie(results[0]);
    setMovies(results);
    await selectMovie(results[0]);
  };
 

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}tv/${id}`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        append_to_response: "videos",
      },
    });

    return data;
  };
  const selectMovie = async (movie) => {
    setPlayTrailer(false);
    const data = await fetchMovie(movie.id);
    console.log(data);
    setSelectedMovie(data);
  };

 
  useEffect(() => {
    fetchMovies();
  }, []);

  

  return (
    <div>
      <Header
        setSearchKey={setSearchKey}
        setSelectedMovie={setSelectedMovie}
        setMovies={setMovies}
        searchKey={searchKey}
      />
      <TrailerContainer
        selectedMovie={selectedMovie}
        playTrailer={playTrailer}
        setPlayTrailer={setPlayTrailer}
      />
      
      <Movies
        movies={movies}
        selectMovie={selectMovie}
      />
      
    </div>
  );
};

export default App;
