import React from 'react'
import axios from 'axios';

const Header = ({ setSearchKey,setSelectedMovie,setMovies,searchKey }) => {
     const API_URL = "https://api.themoviedb.org/3/";
     const PATH_URL = "https://image.tmdb.org/t/p/original";
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
     const searchMovies = (e) => {
          e.preventDefault();
          fetchMoviesSearch(searchKey);
     };
  return (
       <div>
            <header className="header-content">
                 <h1 className="movie-title">Pelis Código C13</h1>
                 <form className="form-search" onSubmit={searchMovies}>
                      <input
                           placeholder="Search..."
                           className="input-search"
                           type="text"
                           onChange={(e) => setSearchKey(e.target.value)}
                      />
                      <button className="button-search" type="submit">
                           Submit
                      </button>
                 </form>
            </header>
    </div>
  )
}

export default Header