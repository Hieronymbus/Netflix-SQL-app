import React, {useState} from 'react';
import Header from './Sections/Header.jsx';
import Main from './Sections/Main.jsx';

export default function App() {

    const [itemCount, setItemCount] = useState(12);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

  return (
    <>
      <div className='w-full p-2.5 mx-auto bg-gray-200 flex flex-col gap-10'>
        <Header 
          itemCount={itemCount}
          setItemCount={setItemCount}
          movies={movies}
          setMovies={setMovies}
          loading={loading}
          setLoading={setLoading}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
        <Main 
          itemCount={itemCount}
          setItemCount={setItemCount}
          movies={movies}
          setMovies={setMovies}
          loading={loading}
          setLoading={setLoading}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
      </div>
    </>
  )
}