

function SettingModal({ setIsModalFor, isModalFor, netflixUser, fetchFavourites, setMovies, movies, logout, setSettingModal, setFetchFavourites, setSignup, setLoginForm }) {
    
    const PORT = 3000;

    async function fetchFavouriteMovies() {
        setFetchFavourites(true);
        const response = await fetch(`http://localhost:${PORT}/get-favourites/${netflixUser.userId}`);
        const favMovieData = await response.json();
        if(favMovieData.length > 0){
            let favMovieArr = [];
            for(const movie of favMovieData) {
                favMovieArr.push(movie.title);
            };
            
            setMovies(prev => ({
                movies: prev.movies,
                shows: prev.shows,
                favourites: favMovieArr
            }));

            console.log(movies);
        };
    };

    return(
        <div className='flex items-center w-fit px-10 justify-center z-20 absolute top-2 left-10 rounded-full bg-slate-600'>
            <button className='absolute text-white text-xl right-2.5' onClick={() => setSettingModal(false)}>x</button>
            <div className=' relative flex gap-5 w-full bg-slate-700'>
                <div onMouseOver={() => setFetchFavourites(true)} onMouseOut={() => setFetchFavourites(false)} className={`${fetchFavourites ? 'absolute' : 'hidden'} -bottom-64 bg-black h-64 w-full z-20`}>
                    {movies.favourites?.map((movie) => {
                        return <p onClick={() =>setIsModalFor(movie)} className='text-white my-5 hover:bg-white hover:text-black hover:cursor-pointer'key={movie}>{movie}</p>
                    })}
                </div>
                <button className='text-white py-5' onClick={() => alert('Settings are still under development')}>Settings</button>
                <button className='w-full rounded-full text-white' onMouseOver={() => fetchFavouriteMovies()} onMouseOut={() => setFetchFavourites(false)}>Favourites</button>
                {!netflixUser && <button className='text-white' onClick={() => setSignup(true)}>Sign up</button>}
                {!netflixUser && <button className='text-white' onClick={() => setLoginForm(true)}>Sign in</button>}
                {netflixUser && <button className='text-white text-nowrap' onClick={() => logout()}>Sign out</button>}
            </div>
        </div>
    )
};

export default SettingModal;