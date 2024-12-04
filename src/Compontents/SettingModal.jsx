

function SettingModal({ fetchFavourites, handleFetchFavourites }) {
    
    return(
        <div className='z-20 absolute left-0 right-0 bg-slate-950 w-fit h-fit p-5'>
            <div className='flex flex-col'>
                <button className='mb-2.5  text-white bg-slate-950' onClick={() => alert('Settings are still under development')}>Settings</button>
                <button className='mb-2.5  text-white bg-slate-950' onClick={() => handleFetchFavourites()}>Favourites</button>
                <button className='mb-2.5  text-white bg-slate-950' onClick={() => alert('Settings are still under development')}>Settings</button>
            </div>
        </div>
    )
};

export default SettingModal;