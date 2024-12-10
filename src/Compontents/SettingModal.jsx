

function SettingModal({ netflixUser, fetchFavourites, logout, setSettingModal, setFetchFavourites, setSignup, setLoginForm }) {
    
    return(
        <div className='flex items-center w-fit px-10 justify-center z-20 absolute top-2 left-10 rounded-full bg-slate-600'>
            <button className='absolute text-white text-xl right-2.5' onClick={() => setSettingModal(false)}>x</button>
            <div className=' relative flex gap-5 w-full bg-slate-700'>
                <div className={`${fetchFavourites ? 'absolute' : 'hidden'} -bottom-12 bg-black min-h-16 w-full z-20`}>

                </div>
                <button className='text-white py-5' onClick={() => alert('Settings are still under development')}>Settings</button>
                <button className='w-full rounded-full text-white' onMouseOver={() => setFetchFavourites(true)} onMouseOut={() => setFetchFavourites(false)}>Favourites</button>
                {!netflixUser && <button className='text-white' onClick={() => setSignup(true)}>Sign up</button>}
                {!netflixUser && <button className='text-white' onClick={() => setLoginForm(true)}>Sign in</button>}
                {netflixUser && <button className='text-white text-nowrap' onClick={() => logout()}>Sign out</button>}
            </div>
        </div>
    )
};

export default SettingModal;