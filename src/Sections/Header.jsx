

function Header(props) {
    return (
        <header className='text-center w-5/6'>
            <div>
                <h1 className='mt-5'>NETFLIX</h1>
                <form className='flex my-5'>
                    <input type="text" name="searchInput" className='p-2.5 mr-2.5 w-full border border-black rounded' />
                    <button type="submit" className='w-1/5 border border-black rounded'>Search</button>
                </form>
                <div name="dropDownContainer" className='flex gap-2.5'>
                    <div name="dropDown" className='border border-black rounded p-2.5'>
                        <button onClick={() => props.setReleaseYear(!props.isReleaseYear)}>Release_year</button>
                    </div>
                    <div name="dropDown" className='border border-black rounded p-2.5'>
                        <button onClick={() => props.setRating(!props.isRating)}>Minimum_rating</button>
                    </div>
                    <div name="dropDown" className='border border-black rounded p-2.5'>
                        <button onClick={() => props.setDuration(!props.isDuration)}>Duration</button>
                    </div>
                </div>
            </div>

        </header>
    );
}

export default Header;
