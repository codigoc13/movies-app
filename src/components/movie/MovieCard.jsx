import React from 'react'
import './Movie.css'
const MovieCard = ({  movieInfo }) => {
     
  return (
       <div  className="card-movie">
            <p>
                 {movieInfo.name}
            </p>
            <img className='image' src={'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + movieInfo.poster_path} alt={movieInfo.name} />
    </div>
  )
}

export default MovieCard