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
  const [isSearching, setIsSearching] = useState(false);

const debugSetIsSearching = (newState) => {
  console.log("setting to " + newState);
  setIsSearching(newState);
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
          movies={movies}
          setIsSearching={setIsSearching}
          isSearching={isSearching}
          itemCount={itemCount}
          setItemCount={setItemCount}
        />
        <Main 
          setDuration={setDuration}
          isDuration={isDuration}
          setReleaseYear={setReleaseYear}
          isReleaseYear={isReleaseYear}
          setRating={setRating}
          isRating={isRating}
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