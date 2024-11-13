import React, { useState } from 'react';
import Header from './Sections/Header.jsx';
import Main from './Sections/Main.jsx';

export default function App() {
  const [isDuration, setDuration] = useState(false);
  const [isReleaseYear, setReleaseYear] = useState(false);
  const [isRating, setRating] = useState(false);

  const [itemCount, setItemCount] = useState(12);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchItemCount, setSearchItemCount] = useState(12);
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState('');

const debugSetIsSearching = (newState) => {
  console.log("setting to " + newState);
  setIsSearching(newState);
}


const fetchSearchedMovie = async (e) => {
        
  try {
      
      const response = await fetch(`http://localhost:3000/search?searchFor=${searchInput}&itemCount=${itemCount}`);

      if(!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      };

      const searchData = await response.json();
      
      let searchedForArr = []

      for(const movie of searchData) {
          searchedForArr.push(movie.title);
      };
      
      setMovies( searchedForArr);
      console.log('made it');
      console.log(isSearching) 
      
  } catch (error) {
      console.error(error)
  }

}


  console.log("Rerendering App.jsx with isSearching = " + isSearching);

  return (
    <>
      <div className='w-full p-2.5 mx-auto bg-gray-200 flex flex-col gap-10'>
        <Header 
          setDuration={setDuration}
          isDuration={isDuration}
          setReleaseYear={setReleaseYear}
          isReleaseYear={isReleaseYear}
          setRating={setRating}
          isRating={isRating}
          setMovies={setMovies}
          isSearching={isSearching}
          setIsSearching={debugSetIsSearching}
          searchItemCount={searchItemCount}
          setSearchItemCount={setSearchItemCount}
          fetchSearchedMovie={fetchSearchedMovie}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <Main 
          setDuration={setDuration}
          isDuration={isDuration}
          setReleaseYear={setReleaseYear}
          isReleaseYear={isReleaseYear}
          setRating={setRating}
          isRating={isRating}
          itemCount={itemCount}
          setItemCount={setItemCount}
          movies={movies}
          setMovies={setMovies}
          loading={loading}
          setLoading={setLoading}
          isSearching={isSearching}
          setIsSearching={debugSetIsSearching}
          searchItemCount={searchItemCount}
          setSearchItemCount={setSearchItemCount}
          fetchSearchedMovie={fetchSearchedMovie}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </div>
    </>
  )
}