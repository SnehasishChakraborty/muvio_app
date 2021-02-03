import React, { useEffect, useState } from 'react'
import Movie from './components/Movie'

const featuredApi = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1'

const searchApi = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query='

function App() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const getMovies = (Api)=>{
    fetch(Api)
    .then(resp=> resp.json())
    .then(data => {
      console.log(data)
      setMovies(data.results)})
  } 

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if(searchTerm){
      getMovies(searchApi+searchTerm)
      setSearchTerm('')  
    }
  }
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }
  useEffect(()=>{
    getMovies(featuredApi)
  },[])
  return (
    <>
    <div>
      <header>
        <form onSubmit={handleOnSubmit}>
           <input className='search' 
           type='search' 
           placeholder='Search movies'
           value={searchTerm}
           onChange={handleOnChange}>
           </input>
        </form>
      </header>
    </div>
    <div className='movie-container'>
    {movies.length > 0 && movies.map(movie=>{
      return <Movie key={movie.id} {...movie}/>
    })}
    </div>
    </>
  );
}

export default App;
