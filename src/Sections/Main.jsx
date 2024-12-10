import React, { useEffect, useState } from 'react';
import MovieModal from '../Compontents/MovieModal';

const PORT = 3000;

function Main( { searchInput, fetchFavourites, setFetchFavourites, netflixUser, token, fetchSearchedMovie, itemCount, filterValue, setItemCount, movies, setMovies, loading, setLoading, isSearching, setIsModalFor, isModalFor } ) {

    const [movieCount, setMovieCount] = useState();
    const [isLoading, setIsLoading] = useState(true);
    
    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    // }, []);
    
    //Clear movies when applying filter
    useEffect(() => {
        setMovies([]);
        setMovieCount(movies.length); // Re render the page to load filtered movies
        setItemCount({
            movieCount: 4,
            showCount: 4,
            searchCount: 0
        });
    }, [filterValue]);

    useEffect(() => setMovies([]), [fetchFavourites]);//Don't know if this prevents favourite movies from sppending to all movies arr
    
    useEffect(() => {
        setLoading(true);
        if(filterValue) {
            fetchMoviesByFilter();
        } else if(isSearching) {
            fetchSearchedMovie();
        } else {
            fetchAllMovies();
            fetchTvShows();
            console.log('movies: ', movies);                            
        };
    }, [itemCount, netflixUser, fetchFavourites, filterValue]);

    //Infinite scroll logic
    function handleScroll(e) {
        const movieRect = document.getElementById('lastMovie').getBoundingClientRect();
        const showRect = document.getElementById('lastShow').getBoundingClientRect();
        // console.log('HEIGHT: ', document.documentElement.scrollHeight);
        // console.log('TOP: ', document.documentElement.scrollTop);
        // console.log('WINDOW: ', window.innerHeight);
        // console.log(e);
        // console.log('VIEWPORT WIDTH: ' + document.documentElement.scrollWidth);
        // console.log('LAST ELEMENTS RIGHT POSITION: ' + rect.right);
        if(movieRect.right < document.documentElement.scrollWidth) {
            setItemCount(prev => ({
                showCount: prev.showCount,
                movieCount: prev.movieCount += 4
            }));
        };

        if(showRect.right < document.documentElement.scrollWidth) {
            setItemCount(prev => ({
                movieCount: prev.movieCount,
                showCount: prev.showCount += 4
            }));
        }
    };  

    async function fetchAllMovies() {
        const response = await fetch(`${import.meta.env.VITE_PORT}/movies/?itemCount=${itemCount.movieCount}`);
        const movieData = await response.json(); 
        setTimeout(() => {
            if(movieData.length > 0) {
                setMovies(prev => ({
                    ...prev,
                    movies: [...prev.movies || [], ...movieData]
                }));
            };
        }, 500);
    };

    async function fetchTvShows() {
        try {
            const response = await fetch(`http://localhost:${PORT}/tv-shows/?itemCount=${itemCount.showCount}`);
            const tvShowData = await response.json();
            setTimeout(() => {
                if(tvShowData.length > 0) {
                    setMovies(prev => ({
                        ...prev, 
                        shows: [...prev.shows || [], ...tvShowData]
                    }));
                };
            }, 500);
            } catch(err) {
            console.error(err.stack);
        }
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
        <main className='w-full relative text-center'>
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
            <div>
                <h2 className='text-3xl text-black mb-5'>Movies</h2>
                <ul onScroll={(e) => handleScroll(e.target)} className='flex gap-2.5 max-w-screen max-h-96 overflow-y-auto no-scrollbar no-scrollbar::-webkit-scrollbar'>
                    {movies.movies?.length > 0 && movies.movies.map((movie, index) => {
                        return (        
                            <li 
                                key={index}
                                id={index + 1 === movies.movies.length ? 'lastMovie' : 'notLastMovie'}// Generate an ID to select the element for position measurements
                                className='basis-3/12 flex-none relative p-5 h-96 text-slate-100 bg-slate-700 hover:bg-slate-900 border border-black rounded cursor-pointer'
                                onClick={()=>{setIsModalFor(movie.title)}}
                            >
                                <div className='w-full flex flex-col justify-between h-full'>  
                                    <h1 className='text-2xl text-center my-auto'>{movie.title.length >= 40 ? movie.title.slice(0, 40) + "..." : movie.title }</h1>
                                    <div className='flex justify-between w-full'>
                                        <p>{movie.duration}</p>
                                        <p>{movie.rating}</p>
                                    </div>
                                </div> 
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div>
                <h2 className='text-3xl text-black my-5'>Tv-Shows</h2>
                <ul onScroll={(e) => handleScroll(e.target)} className=' relative flex gap-2.5 max-w-screen max-h-96 overflow-y-auto no-scrollbar no-scrollbar::-webkit-scrollbar'>
                    <div className={`${isLoading ? 'absolute' : 'hidden'} font-bold text-3xl text-green-500 z-20 inset-y-2/4 inset-x-2/4`}>
                        Loading...
                    </div>
                    {movies.shows?.length > 0 && movies.shows.map((show, index) => {
                        return (        
                            <li 
                                key={index} 
                                id={index + 1 === movies.shows.length ? 'lastShow' : 'notLastShow'}
                                className='basis-3/12 flex-none relative p-5 h-96 text-slate-100 bg-slate-700 hover:bg-slate-900 border border-black rounded cursor-pointer'
                                onClick={()=>{setIsModalFor(show.title)}}
                            >
                                <div className='w-full flex flex-col justify-end h-full'>  
                                    <h1 className='text-2xl mb-auto mt-auto'>{show.title.length >= 40 ? show.title.slice(0, 40) + "..." : show.title }</h1>
                                    <div className='flex justify-between w-full'>
                                        <p>{show.duration}</p>
                                        <p>{show.rating}</p>
                                    </div>
                                </div> 
                            </li>
                        )
                    })}
                </ul>
            </div>
        </main>
    );
};

export default Main;