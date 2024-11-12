import React, { useEffect, useState } from 'react';

function Main(props) {
    const [itemCount, setItemCount] = useState(12);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUrl = `http://localhost:3000/?itemCount=${itemCount}`;
    useEffect(() => {
        setLoading(true);
        fetchAllMovies();
    }, [itemCount]);

    function handleScroll() {
        // console.log('HEIGHT: ', document.documentElement.scrollHeight);
        // console.log('TOP: ', document.documentElement.scrollTop);
        // console.log('WINDOW: ', window.innerHeight);

        // + 1 sum to account for some browsers inner height and scroll top values not equalling scroll heights value
        if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setItemCount(prev => {
                let newItemCount = prev + 12;
                console.log(newItemCount);
                return newItemCount;
            });
        };
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);

    async function fetchAllMovies() {
        const response = await fetch(fetchUrl);
        const movieData = await response.json(); 
        let movieArr = [];

        for(const movie of movieData) {
            movieArr.push(movie.title);
        };
        
        let newMovies = movieArr.slice(itemCount - 12)

        setMovies(prev => [
            ...prev,
            ...newMovies
        ]);
        
        console.log(movieArr);
        // movieArr = [];
        setLoading(false);
    };

    return(
        <main className='w-5/6 relative'>
            <h1 className='absolute mx-auto bottom-0 left-0 right-0 bold text-center bg-black w-1/4 text-white'>
                {loading && 'loading...'}
            </h1>
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