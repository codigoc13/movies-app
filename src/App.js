import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import MovieCard from './components/movie/MovieCard'

const App = () => {
  const [movies, setMovies] = useState([])

  const API_URL = "https://api.themoviedb.org/3/"

  const fetchMovies = async () => {

    const { data: { results } } = await axios.get(`${API_URL}discover/tv`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY
      }
    })


    setMovies(results)

  }

  useEffect(() => {
    fetchMovies()
  }, [])

 
  return (
    <div >
      <h1>Hola Escuela de Código C13</h1>
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