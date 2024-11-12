import React, { useEffect, useState } from 'react';

function Main(props) {
    const [itemCount, setItemCount] = useState(12);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    //Clear movies when applying filter
    useEffect(() => {
        setMovies([]);
        setItemCount(12);
    }, [props.isRating, props.isReleaseYear, props.isDuration]);

    useEffect(() => {
        setLoading(true);
        if(props.isRating) {
            props.setReleaseYear(false);
            props.setDuration(false);
            fetchMoviesByRating();
        } else if(props.isReleaseYear) {
            props.setRating(false);
            props.setDuration(false);
            fetchMoviesByReleaseYear();
        } else if(props.isDuration) {
            props.setReleaseYear(false);
            props.setRating(false);
            fetchMoviesByDuration();
        } else {
            props.setReleaseYear(false);
            props.setDuration(false);
            props.setRating(false);
            fetchAllMovies();
        }
    }, [itemCount, props.isRating, props.isReleaseYear]);

    function handleScroll() {
        // console.log('HEIGHT: ', document.documentElement.scrollHeight);
        // console.log('TOP: ', document.documentElement.scrollTop);
        // console.log('WINDOW: ', window.innerHeight);

        // + 1 sum to account for some browsers inner height and scroll top values not equalling scroll heights value
        if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setItemCount(prev => prev + 12);
        };
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);

    async function fetchMoviesByReleaseYear() {
        try {
            const response = await fetch(`http://localhost:3000/releaseYear/?itemCount=${itemCount}&releaseYear=2000`);
            console.log(itemCount);
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            };

            const movieData = await response.json();
            const newMovies = movieData.slice(-12).map(movie => {
                return movie.title + ' ' + movie.release_year;
            });

            console.log(movies);

            setMovies(prev => [...prev, ...newMovies]);
        } catch(err) {
            console.error('Error fetching movies ', err);
        } finally {
            setLoading(false);
        };
    }

    async function fetchMoviesByDuration() {
        try {
            const response = await fetch(`http://localhost:3000/duration/?itemCount=${itemCount}&duration=1+Season`);
            console.log(itemCount);
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            };

            const movieData = await response.json();
            const newMovies = movieData.slice(-12).map(movie => {
                return movie.title + ' ' + movie.duration;
            });

            console.log(movies);

            setMovies(prev => [...prev, ...newMovies]);
        } catch(err) {
            console.error('Error fetching movies ', err);
        } finally {
            setLoading(false);
        };
    }

    async function fetchMoviesByRating() {
        try {
            const response = await fetch(`http://localhost:3000/rating/?itemCount=${itemCount}&rating=PG-13`);
            console.log(itemCount);
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            };

            const movieData = await response.json();
            const newMovies = movieData.slice(-12).map(movie => {
                return movie.title + ' ' + movie.rating;
            });

            console.log(movies);

            setMovies(prev => [...prev, ...newMovies]);
        } catch(err) {
            console.error('Error fetching movies ', err);
        } finally {
            setLoading(false);
        };
    };

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