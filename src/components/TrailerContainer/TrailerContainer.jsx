import React from 'react'
import Youtube from 'react-youtube'

const TrailerContainer = ({ selectedMovie, playTrailer, setPlayTrailer }) => {
     const PATH_URL = "https://image.tmdb.org/t/p/original";
     
     const renderTrailer = () => {
          const trailer = selectedMovie.videos.results.find(
               (video) => video.name === "Official Trailer"
          );
          const key = trailer ? trailer.key : selectedMovie.videos.results[0].key;
          return (
               <Youtube
                    videoId={key}
                    className="youtube-container"
                    opts={{
                         width: "100%",
                         height: "600px",
                         playerVars: {
                              autoplay: true,
                         },
                    }}
               />
          );
     };

  return (
       <div>
            <div
                 className="container-movie"
                 style={{
                      backgroundImage: `url(${PATH_URL}${selectedMovie.backdrop_path})`,
                 }}
            >
                 {playTrailer ? (
                      <button
                           className="button-trailer close-trailer"
                           onClick={() => setPlayTrailer(false)}
                      >
                           Close
                      </button>
                 ) : null}
                 {selectedMovie.videos && playTrailer ? renderTrailer() : null}
                 <div className="movie-content">
                      <button
                           className="button-trailer"
                           onClick={() => setPlayTrailer(true)}
                      >
                           Play Trailer
                      </button>
                      <h1 className="movie-title">{selectedMovie.name}</h1>
                      {selectedMovie.overview ? (
                           <p className="description-movie">{selectedMovie.overview}</p>
                      ) : null}
                 </div>
            </div>
    </div>
  )
}

export default TrailerContainer