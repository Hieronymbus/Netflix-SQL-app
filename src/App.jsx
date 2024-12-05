import React, { useState, useEffect } from 'react';
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
  const [isModalFor, setIsModalFor ] = useState("");
  const [token, setToken] = useState();
  const [netflixUser, setNetflixUser] = useState();
  const [fetchFavourites, setFetchFavourites] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setNetflixUser(user);
  }, [fetchFavourites]);

 // async function that handles fetch api call for searching, using searchInput and item counts as query and sets movies state to the response.titles
  const fetchSearchedMovie = async (e) => {
    let titleToSearch = encodeURIComponent(searchInput);
    let searchedForArr = []
    try { 
        const response = await fetch(`${import.meta.env.VITE_PORT}/search?searchFor=${titleToSearch}&itemCount=${itemCount}`);
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        };
        const searchData = await response.json();

        for(const movie of searchData) {
            searchedForArr.push(movie.title);
        };
        setMovies( searchedForArr);
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    };
}
  return (
    <>
      {isModalFor && <div className='w-screen h-screen z-10 bg-slate-950 fixed opacity-50'></div>}
      <div className='p-5 mx-auto bg-gray-200 flex flex-col  gap-10 '>
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
          token={token}
          setToken={setToken}
          netflixUser={netflixUser}
          setNetflixUser={setNetflixUser}
          setFetchFavourites={setFetchFavourites}
          fetchFavourites={fetchFavourites}
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
          setToken={setToken}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          searchInput={searchInput}
          itemCount={itemCount}
          setItemCount={setItemCount}
          fetchSearchedMovie={fetchSearchedMovie}
          setSearchInput={setSearchInput}
          isModalFor={isModalFor}
          setIsModalFor={setIsModalFor}
          netflixUser={netflixUser}
          fetchFavourites={fetchFavourites}
          setFetchFavourites={setFetchFavourites}
        />
      </div>
    </>
  )
}