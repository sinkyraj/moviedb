import React, { useEffect, useState } from 'react'
import Movie from './components/Movie'

//Api stuff
const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c4ea20c3d34396aa2aee00e88c84071c&page=1";

// const IMG_API = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=c4ea20c3d34396aa2aee00e88c84071c&query=";

function App() {

  // const movies = [1, 2, 3, 4]
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getMovies(FEATURED_API);
    // fetch(FEATURED_API).then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //     setMovies(data.results);
    //   })
     }, [])

  const getMovies=(API)=> {
    fetch(API)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setMovies(data.results);
        })
    }

  const handleOnSubmit= (e)=>{
  e.preventDefault();
 if(searchTerm){
   getMovies(SEARCH_API + searchTerm)
    // fetch(SEARCH_API + searchTerm)
    //     .then(res => res.json())
    //     .then(data => {
    //     console.log(data)
    //     setMovies(data.results);
    //   })
      setSearchTerm("");
      }
  }

  const handleOnChange = (e) =>{
    setSearchTerm(e.target.value);
  }
  return (
    <>
     
      <header>
        <form onSubmit={handleOnSubmit}>
        <input 
        className="search" 
        type="search" 
        placeholder="Search..." 
        value = {searchTerm}
        onChange={handleOnChange}
        />
        </form>
      </header>
      <div className="movie-container">
        
        {movies.length > 0 && movies.map(movie => (
          <Movie key={movie.id} {...movie}/>
        ))}
      </div>
    </>
  );
}

export default App;
