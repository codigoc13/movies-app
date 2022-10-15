import React from "react";
import "./Movie.css";
const MovieCard = ({ movieInfo, selectMovie }) => {
     const PATH_URL = "https://image.tmdb.org/t/p/w500";
     const image = movieInfo.poster_path ==="null"
          ? movieInfo.backdrop_path
          : movieInfo.poster_path
     
     return (
          <div className="card-movie" onClick={() => selectMovie(movieInfo)}>
               {
                    image === null ? <div className="not-image">
                         <p>Not Found</p>
                    </div> :
                    <img
                         className="image"
                         src={`${PATH_URL}${image}`}
                         alt={movieInfo.name}
                    />
               }
               <p>{movieInfo.name}</p>
          </div>
     );
};

export default MovieCard;
