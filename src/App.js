import React, { useEffect, useState } from "react";
import axios from "axios";
import Youtube from 'react-youtube'
import "./App.css";
import MovieCard from "./components/movie/MovieCard";

const App = () => {
  const API_URL = "https://api.themoviedb.org/3/";
  const PATH_URL = "https://image.tmdb.org/t/p/original";
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchKey, setSearchKey] = useState("");
  const [playTrailer, setPlayTrailer] = useState(false)

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
    await selectMovie(results[0])
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

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}tv/${id}`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        append_to_response: 'videos'
      },
    })


    return data

  }
  const selectMovie = async (movie) => {
    setPlayTrailer(false)
    const data = await fetchMovie(movie.id)
    // console.log(data)
    setSelectedMovie(data)
  }

  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(video =>
      video.name === "Official Trailer")
    const key=trailer?trailer.key:selectedMovie.videos.results[0].key
    return (
      <Youtube
        videoId={key}
        className="youtube-container"
        opts={{
          width: '100%',
          height: '600px',
          playerVars: {
            autoplay: true,
            
          }
          
        }}
        
          
        
      />
    )
  }
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
          {playTrailer? <button className="button-trailer close-trailer" onClick={() => setPlayTrailer(false)}>Close</button>: null}
          {selectedMovie.videos&&playTrailer? renderTrailer():null}
        <div className="movie-content" >

          
          <button className="button-trailer" onClick={()=>setPlayTrailer(true)}>Play Trailer</button>
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
              selectMovie={selectMovie}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
