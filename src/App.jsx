import React, { useState } from 'react';
import Header from './Sections/Header.jsx';
import Main from './Sections/Main.jsx';

export default function App() {
  const [isDurationFilter, setDurationFilter] = useState(false);
  const [isReleaseYearFilter, setReleaseYearFilter] = useState(false);
  const [isRatingFilter, setRatingFilter] = useState(false);
  const [itemCount, setItemCount] = useState(12);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filterValue, setFilterValue] = useState();
  const [searchInput, setSearchInput] = useState('');

 // async function that handles fetch api call for searching, using searchInput and item counts as query and sets movies state to the response.titles
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
        console.log("yo")
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }

}
  return (
    <>
      <div className='w-full p-2.5 mx-auto bg-gray-200 flex flex-col gap-10'>
        <Header 
          setFilterValue={setFilterValue}
          filterValue={filterValue}
          setItemCount={setItemCount}
          setDurationFilter={setDurationFilter}
          isDurationFilter={isDurationFilter}

          setReleaseYearFilter={setReleaseYearFilter}
          isReleaseYearFilter={isReleaseYearFilter}
          
          setRatingFilter={setRatingFilter}
          isRatingFilter={isRatingFilter}

          setMovies={setMovies}
          movies={movies}

          setIsSearching={setIsSearching}
          isSearching={isSearching}
          fetchSearchedMovie={fetchSearchedMovie}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
   
        <Main 
          setFilterValue={setFilterValue}
          filterValue={filterValue}
          setDurationFilter={setDurationFilter}
          isDurationFilter={isDurationFilter}
          setReleaseYearFilter={setReleaseYearFilter}
          isReleaseYearFilter={isReleaseYearFilter}
          setRatingFilter={setRatingFilter}
          isRatingFilter={isRatingFilter}
          movies={movies}
          setMovies={setMovies}
          loading={loading}
          setLoading={setLoading}

          isSearching={isSearching}
          setIsSearching={setIsSearching}
          searchInput={searchInput}
          itemCount={itemCount}
          setItemCount={setItemCount}
          
          fetchSearchedMovie={fetchSearchedMovie}
          
          setSearchInput={setSearchInput}
        />
      </div>
    </>
  )
}