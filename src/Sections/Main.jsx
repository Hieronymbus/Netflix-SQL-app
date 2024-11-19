import React, { useEffect, useState } from 'react';
import MovieModal from '../Compontents/MovieModal';

function Main( { fetchSearchedMovie, itemCount, filterValue, setItemCount, movies, setMovies, loading, setLoading, isSearching, setIsModalFor, isModalFor } ) {
    const [movieCount, setMovieCount] = useState();
    
    //Clear movies when applying filter
    useEffect(() => {
        setMovies([]);
        setMovieCount(movies.length); // Re render the page to load filtered movies
        setItemCount(12);
    }, [filterValue]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setLoading(true);
        if(filterValue) {
            fetchMoviesByFilter();
        } else if(isSearching) {
            fetchSearchedMovie()
        } else {
            fetchAllMovies();
        };

    }, [itemCount, filterValue]);

    function handleScroll() {
        // console.log('HEIGHT: ', document.documentElement.scrollHeight);
        // console.log('TOP: ', document.documentElement.scrollTop);
        // console.log('WINDOW: ', window.innerHeight);

        // + 1 sum to account for some browsers inner height and scroll top values not equalling scroll heights value
        if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {       
                setItemCount(prev => prev + 12);  
        };
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);

    async function fetchAllMovies() {
        const response = await fetch(`http://localhost:3000/?itemCount=${itemCount}`);
            const movieData = await response.json(); 
            let movieArr = [];

            for(const movie of movieData) {
                movieArr.push(movie.title);
                
            };
            
        let newMovies = movieArr.slice(itemCount - 12);

            setMovies(prev => [
                ...prev,
                ...newMovies
            ]);
            setLoading(false);
    };

    async function fetchMoviesByFilter() {
        console.log(filterValue);
        try {
            //Use URLSearchParams to omit queries;
            const queryParams = new URLSearchParams();
            if(filterValue.releaseYearValue) {
                queryParams.append('releaseYear', filterValue.releaseYearValue);    
            };
            if(filterValue.durationValue) {
                queryParams.append('duration', filterValue.durationValue);
            };
            if(filterValue.ratingValue) {
                queryParams.append('rating', filterValue.ratingValue);
            };
            queryParams.append('itemCount', itemCount);

            const response = await fetch(`http://localhost:3000/filter/?${queryParams.toString()}`);
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            };
            const movieData = await response.json();
            const newMovies = movieData.slice(-12).map(movie => {
                return `${movie.title}`;
            });

            setMovies(prev => [...prev, ...newMovies]);
        } catch(err) {
            console.error('Error fetching movies ', err);
        } finally {
            setLoading(false);
        };
    };
    return(
        <main className='w-full relative '>
            <h1 className='absolute mx-auto bottom-0 left-0 right-0 bold text-center bg-black w-1/4 text-white'>
                {loading && 'loading...'}
            </h1>
            {
                isModalFor 
                && 
                <MovieModal 
                    setIsModalFor={setIsModalFor}
                    isModalFor={isModalFor}
                />
            }  
            
            <ul className='grid grid-cols-2 md:grid-cols-4 gap-2.5'>
                {movies.map((movie, index) => {

                    return (        
                        <li 
                            key={index} 
                            className='p-5 w-full h-64 text-slate-100 bg-slate-700 hover:bg-slate-900 border border-black rounded flex justify-center items-center text-center cursor-pointer'
                            onClick={()=>{
                                setIsModalFor(movie)
                                console.log(movie)
                            }}
                        >
                            <div>  
                                <h1 className='text-2xl'>{movie.length >= 40 ? movie.slice(0, 40) + "..." : movie }</h1>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </main>
    );
}

export default Main;