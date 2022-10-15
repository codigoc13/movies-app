import React from "react";
import "./Movie.css";
const MovieCard = ({ movieInfo }) => {
     const PATH_URL = "https://image.tmdb.org/t/p/w500";
     const image = movieInfo.poster_path ==="null"
          ? movieInfo.backdrop_path
          : movieInfo.poster_path
     
     return (
          <div className="card-movie">
               {
                    image===null ? <img
                         className="image"
                         src="https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_960_720.jpg"
                         alt={movieInfo.name}
                    /> :
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
