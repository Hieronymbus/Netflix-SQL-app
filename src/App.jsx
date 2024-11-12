import React, { useState } from 'react';
import Header from './Sections/Header.jsx';
import Main from './Sections/Main.jsx';

export default function App() {
  const [isDuration, setDuration] = useState(false);
  const [isReleaseYear, setRelaseYear] = useState(false);
  const [isRating, setRating] = useState(false);

  return (
    <>
      <div className='w-full p-2.5 mx-auto bg-gray-200 flex flex-col gap-10'>
        <Header 
          setDuration={setDuration}
          isDuration={isDuration}
          setRelaseYear={setRelaseYear}
          isReleaseYear={isReleaseYear}
          setRating={setRating}
          isRating={isRating}
        />
        <Main 
          setDuration={setDuration}
          isDuration={isDuration}
          setRelaseYear={setRelaseYear}
          isReleaseYear={isReleaseYear}
          setRating={setRating}
          isRating={isRating}
        />
      </div>
    </>
  )
}