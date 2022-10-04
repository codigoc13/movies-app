import React from 'react'
import './Movie.css'
const MovieCard = ({  movieInfo }) => {
     const PATH_URL ="https://image.tmdb.org/t/p/w500"
  return (
       <div  className="card-movie">
            <p>
                 {movieInfo.name}
            </p>
            {
                 movieInfo.poster_path
                      ? <img className='image' src={`${PATH_URL}${movieInfo.poster_path}`} alt={movieInfo.name} />
                      : null
            }
            
    </div>
  )
}

export default MovieCard