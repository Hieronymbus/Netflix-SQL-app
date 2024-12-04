import React, { useEffect, useState } from 'react';
import MovieModal from '../Compontents/MovieModal';

const PORT = 3000;

function Main( { searchInput, fetchFavourites, setFetchFavourites, netflixUser, token, fetchSearchedMovie, itemCount, filterValue, setItemCount, movies, setMovies, loading, setLoading, isSearching, setIsModalFor, isModalFor } ) {

    const [movieCount, setMovieCount] = useState();
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);
    
    //Clear movies when applying filter
    useEffect(() => {
        setMovies([]);
        setMovieCount(movies.length); // Re render the page to load filtered movies
        setItemCount(12);
    }, [filterValue]);

    useEffect(() => setMovies([]), [fetchFavourites]);//Don't know if this prevents favourite movies from sppending to all movies arr
    
    useEffect(() => {
        setLoading(true);
        if(filterValue) {
            fetchMoviesByFilter();
        } else if(isSearching) {
            fetchSearchedMovie()
        } else if(fetchFavourites && netflixUser) {
            fetchFavouriteMovies();
        } else {
            fetchAllMovies();
        };

    }, [itemCount, netflixUser, fetchFavourites, filterValue]);

    function handleScroll() {
        // console.log('HEIGHT: ', document.documentElement.scrollHeight);
        // console.log('TOP: ', document.documentElement.scrollTop);
        // console.log('WINDOW: ', window.innerHeight);

        // + 1 sum to account for some browsers inner height and scroll top values not equalling scroll heights value
        if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {       
                setItemCount(prev => prev + 12);  
        };
    };

    async function fetchFavouriteMovies() {
        const response = await fetch(`http://localhost:${PORT}/get-favourites/${netflixUser.userId}`);
        const favMovieData = await response.json();
        if(favMovieData == []) {
            fetchAllMovies();
            return;
        };
        let favMovieArr = [];
        for(const movie of favMovieData) {
            favMovieArr.push(movie.title);
        };

        setMovies(favMovieArr);
        setLoading(false);
    };

    async function fetchAllMovies() {
        const response = await fetch(`${import.meta.env.VITE_PORT}/allMovies/?itemCount=${itemCount}`);
        const movieData = await response.json(); 
        let movieArr = [];

        for(const movie of movieData) {movieArr.push(movie.title)};
            
        let newMovies = [...movies, ...movieArr.slice(itemCount - 12)];

        setMovies(newMovies);
        setLoading(false);
    };

    async function fetchMoviesByFilter() {
        console.log(filterValue);
        const searchValue = encodeURIComponent(searchInput);
        try {
            //Use URLSearchParams to omit queries;
            const queryParams = new URLSearchParams();
            if(searchValue){
                queryParams.append('searchValue', searchValue)
            };
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

            const response = await fetch(`${import.meta.env.VITE_PORT}/filter/?${queryParams.toString()}`);
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            };
            const movieData = await response.json();
            //trial changes using filteredArr
            let filteredArr = []
            for(const movie of movieData) {
                filteredArr.push(movie.title);
            };

            setMovies(prev => [ ...filteredArr]);
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
                    token={token}
                    netflixUser={netflixUser}
                    fetchFavourites={fetchFavourites}
                />
            }  
            
            <ul className='grid grid-cols-1 md:grid-cols-4 gap-2.5'>
                {movies.map((movie, index) => {

                    return (        
                        <li 
                            key={index} 
                            className='relative p-5 w-full h-32 md:h-64  text-slate-100 bg-slate-700 hover:bg-slate-900 border border-black rounded flex justify-center items-center text-center cursor-pointer'
                            onClick={()=>{setIsModalFor(movie)}}
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
};

export default Main;