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

const debugSetIsSearching = (newState) => {
  console.log("setting to " + newState);
  setIsSearching(newState);
}

  console.log("Rerendering App.jsx with isRatingFilter = " + isSearching);

  return (
    <>
      <div className='w-full p-2.5 mx-auto bg-gray-200 flex flex-col gap-10'>
        <Header 
          setFilterValue={setFilterValue}
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
          itemCount={itemCount}
          setItemCount={setItemCount}
        />
        <Main 
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
          setIsSearching={debugSetIsSearching}
          itemCount={itemCount}
          setItemCount={setItemCount}
        />
      </div>
    </>
  )
}