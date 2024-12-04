

function SettingModal({ netflixUser, logout, setSettingModal, handleFetchFavourites, setSignup, setLoginForm }) {
    
    return(
        <div className='z-20 absolute left-0 bg-slate-950 w-fit h-fit p-5'>
            <button className='absolute text-white text-xl right-2.5 top-0' onClick={() => setSettingModal(false)}>x</button>
            <div className='flex flex-col'>
                <button className='mb-2.5  text-white bg-slate-950' onClick={() => alert('Settings are still under development')}>Settings</button>
                <button className='mb-2.5  text-white bg-slate-950' onClick={() => handleFetchFavourites()}>Favourites</button>
                {!netflixUser && <button className='mb-2.5 text-white bg-slate-950' onClick={() => setSignup(true)}>Sign up</button>}
                {!netflixUser && <button className='mb-2.5 text-white bg-slate-950' onClick={() => setLoginForm(true)}>Sign in</button>}
                {netflixUser && <button className='mb-2.5 text-white bg-slate-950' onClick={() => logout()}>Sign out</button>}
            </div>
        </div>
    )
};

export default SettingModal;