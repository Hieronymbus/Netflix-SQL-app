import Register_Login from "./Register_Login";

function SettingModal({ setIsModalFor, signup, value, setValue, updateValues, closeProfileModal, loginForm, isModalFor, netflixUser, fetchFavourites, setMovies, movies, logout, setSettingModal, setFetchFavourites, setSignup, setLoginForm }) {
    
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
        };
    };

    return(
        <div onMouseOver={() => setSettingModal(true)} onMouseLeave={() => setSettingModal(false)} className='flex h-20 items-center w-fit px-10 justify-center z-20 absolute left-0 rounded-full text-red-950 bg-sky-100'>
            <div className='flex relative gap-5 w-full'>
                <div onMouseOver={() => setFetchFavourites(true)} onMouseLeave={() => setFetchFavourites(false)} className={`${fetchFavourites ? 'absolute' : 'hidden'} shadow-xl rounded-lg -bottom-64 left-0 text-red-950 bg-sky-100 h-64 w-full z-20`}>
                    {movies.favourites?.map((movie) => {
                        return <p onClick={() =>setIsModalFor(movie)} className='text-white my-5 text-red-950 hover:text-red-900 hover:cursor-pointer'key={movie}>{movie}</p>
                    })}                 
                </div>
                <button className='p-2.5 hover:text-red-900 text-red-950 rounded-full' onClick={() => alert('Settings are still under development')}>Settings</button>
                {netflixUser && <button className='p-2.5 hover:text-red-900 text-red-950 w-full rounded-full ' onMouseOver={() => fetchFavouriteMovies()} onMouseOut={() => setFetchFavourites(false)}>Favourites</button>}
                {!netflixUser && <button className='p-2.5 hover:text-red-900 text-red-950 text-nowrap rounded-full' onMouseOver={() => setSignup(true)} onMouseLeave={() => setSignup(false)}>Sign up</button>}
                {!netflixUser && <button className='p-2.5 hover:text-red-900 text-red-950 w-full rounded-full' onMouseOver={() => setLoginForm(true)} onMouseLeave={() => setLoginForm(false)}>Sign in</button>}
                {netflixUser && <button className='text-nowrap p-2.5 hover:text-red-900 text-red-950 w-full rounded-full' onClick={() => logout()}>Sign out</button>}
                {loginForm && <Register_Login value={value} setValue={setValue} updateValues={updateValues} closeProfileModal={closeProfileModal} setForm={setLoginForm}/>}
                {signup && <Register_Login value={value} setValue={setValue} updateValues={updateValues} signup={signup} closeProfileModal={closeProfileModal} setForm={setSignup} />}
            </div>
        </div>
    )
};

export default SettingModal;