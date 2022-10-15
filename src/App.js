import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import MovieCard from './components/movie/MovieCard'

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const API_URL = "https://api.themoviedb.org/3/"

  const fetchMovies = async () => {
    
    
    const { data: { results } } = await axios.get(`${API_URL}discover/tv`,
      {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
          
        }
      })


    setMovies(results)

  }
  const fetchMoviesSearch = async (searchKey) => {
    const { data: { results } } = await axios.get(`${API_URL}search/tv`,
      {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
          query: searchKey
        }
      })


    setMovies(results)

  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const searchMovies = (e) => {
    e.preventDefault()
    fetchMoviesSearch(searchKey)
  }

  return (
    <div >
      <header>
        <h1>Hola Escuela de Código C13</h1>
        <form onSubmit={searchMovies}>

          <input type='text' onChange={(e) => setSearchKey(e.target.value)} />
          <button type='submit'>Submit</button>
        </form>
      </header>
      <div className='container-movies'>
        {
          movies.map(movie => (
            <div key={movie.id}>
              <MovieCard

                movieInfo={movie}
              />
            </div>





          ))
        }


      </div>

    </div>
  )
}

export default App