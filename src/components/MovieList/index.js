import React from 'react'

function MovieList(props) {
  return (
    <>
      {props.movies.map((movie, index) => {
        return (
          <div key={index} className="image-container d-flex justify-content-start m-4">
            <img src={movie.Poster} alt='movie'></img>
            <div onClick={()=>props.handleClick(movie)} className="overlay c-flex align-items-center justify-content-center">
              {props.favouritesComp}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default MovieList
