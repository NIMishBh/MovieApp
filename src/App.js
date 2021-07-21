import React from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import Search from './components/Search';
import AddFavourite from './components/AddFavourite';
import DeleteFavourite from './components/DeleteFavourite';


function App() {

  const [movies, setMovies] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [favourites, setFavourites] = React.useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=584721d0`
    const response = await fetch(url);
    const responseJSON = await response.json();

    if (responseJSON.Search)
      setMovies(responseJSON.Search)

  };


  React.useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue])

  React.useEffect(() => {
    const favList = JSON.parse(localStorage.getItem('fav-movies'));
    if(favList)setFavourites(favList);
  }, [])

  const handleAddFavClick = (movie) => {
    const newFavList = [...favourites, movie];
    setFavourites(newFavList);
    saveToLS(newFavList);
  }

  const handleDeleteFavClick = (movie) => {
    const newFavList = favourites.filter((item) => item.imdbID !== movie.imdbID);
    setFavourites(newFavList);
    saveToLS(newFavList)
  }

  const saveToLS = (items) => {
    localStorage.setItem('fav-movies', JSON.stringify(items))
  }

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading text='Movies' />
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList movies={movies} handleClick={handleAddFavClick} favouritesComp={<AddFavourite />} />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading text='Favourites' />
      </div>
      <div className="row">
        <MovieList movies={favourites} handleClick={handleDeleteFavClick} favouritesComp={<DeleteFavourite />} />
      </div>
    </div>
  );
}

export default App;
