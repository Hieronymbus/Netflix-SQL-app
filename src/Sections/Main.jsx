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
        setItemCount(4);
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
            fetchTvShows();
        };
    }, [itemCount, netflixUser, fetchFavourites, filterValue]);

    function handleScroll() {
        // console.log('HEIGHT: ', document.documentElement.scrollHeight);
        // console.log('TOP: ', document.documentElement.scrollTop);
        // console.log('WINDOW: ', window.innerHeight);

        // console.log('Width: ' + document.documentElement.scrollWidth);
        // console.log('Height: ' + document.documentElement.scrollHeight);
        // console.log('Window: ' + window.innerWidth);

        // + 1 sum to account for some browsers inner height and scroll top values not equalling scroll heights value
        // if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {       
        //         setItemCount(prev => prev + 12);  
        // };
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
        const response = await fetch(`${import.meta.env.VITE_PORT}/allMovies/?itemCount=${4}`);
        const movieData = await response.json(); 
        let movieArr = [];

        for(const movie of movieData) {movieArr.push(movie)};
        if(movieArr.length > 0) {
            let newMovies = [...(movies?.movies || []), ...movieArr];

            setMovies(prev => ({
                    ...prev,
                    movies: newMovies
            }));
        };

        setLoading(false);
    };

    async function fetchTvShows() {
        try {
            const response = await fetch(`http://localhost:${PORT}/tv-shows`);
            const tvShowData = await response.json();
            const tvShows = [];
            const newTvShows = [];

            for(const show of tvShowData) tvShows.push(show);
            if(tvShows.length > 0) {
                newTvShows.push(...(movies?.shows || []), ...tvShows.slice(itemCount - 12));
                setMovies(prev => ({
                    ...prev, 
                    shows: newTvShows
                }));
            };
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
                    fetchFavouriteMovies={fetchFavouriteMovies}
                />
            }  
            <div>
                <h2 className='text-3xl text-black mb-5'>Movies</h2>
                <ul className='flex gap-2.5 max-w-screen max-h-96 overflow-y-auto no-scrollbar no-scrollbar::-webkit-scrollbar'>
                    {movies.movies?.length > 0 && movies.movies.map((movie, index) => {
                        return (        
                            <li 
                                key={index} 
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
                <ul className='flex gap-2.5 max-w-screen max-h-96 overflow-y-auto no-scrollbar no-scrollbar::-webkit-scrollbar'>
                    {movies.shows?.length > 0 && movies.shows.map((show, index) => {
                        return (        
                            <li 
                                key={index} 
                                className='basis-3/12 flex-none relative p-5 h-96 text-slate-100 bg-slate-700 hover:bg-slate-900 border border-black rounded cursor-pointer'
                                onClick={()=>{setIsModalFor(show.title)}}
                            >
                                <div className='w-full flex flex-col justify-end h-full'>  
                                    <h1 className='text-2xl mb-10'>{show.title.length >= 40 ? show.title.slice(0, 40) + "..." : show.title }</h1>
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