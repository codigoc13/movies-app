import React from 'react'
import MovieCard from '../movie/MovieCard'

const Movies = ({ movies, selectMovie }) => {
     
  return (
       <div className="container-movies">
            {movies.map((movie) => (
                 <div key={movie.id}>
                      <MovieCard movieInfo={movie} selectMovie={selectMovie} />
                 </div>
            ))}
    </div>
  )
}

export default Movies