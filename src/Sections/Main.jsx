import React, { useEffect, useState } from 'react';

function Main() {
    const [movies, setMovies] = useState([
        'The Starling', 
        'Bright Star', 
        'The Least Expected Day: Inside the Life of a Medicritical Family', 
        'Star Trek'
    ]);

    //Use to prevent api calls on every rerender
    // useEffect(() => {
    //     generateWords();
    // }, []);

    //Laptop is getting hot
    // async function generateWords() {
    //     const response = await fetch('https://random-word-api.herokuapp.com/all');
    //     const data = await response.json();

    //     setMovies(prev => [
    //         ...prev,
    //         ...data.slice(0, 100)
    //     ]);
        
    // };

    function generateWords() {
        const moviePlaceholders = [];
        for(let i = 0; i < 100; i++) {
            moviePlaceholders.push(i);
        };

        setMovies(prev => [
            ...prev,
            ...moviePlaceholders
        ]);
    };

    generateWords();

    return(
        <main className='w-5/6'>
            <ul className='grid grid-cols-4 gap-2.5'>
                {movies.map((movie, index) => {
                    if(movie.length >= 40) {
                        let truncatedMovieTitle = movie.slice(0, 40) + "...";
                        movie = truncatedMovieTitle;
                    };

                    return (        
                        <li key={index} className='p-5 w-full h-64 border border-black rounded flex justify-center items-center text-center'>
                            <div>
                                <h1 className='text-lg'>{movie}</h1>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </main>
    );
}

export default Main;