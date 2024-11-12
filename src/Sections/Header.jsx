
import { useState, useEffect } from "react";


function Header({ isReleaseYear, setReleaseYear, isRating, setRating, isDuration, setDuration, isSearching, setIsSearching, setMovies }) {

    const [searchInput, setSearchInput] = useState('')
    const [debounceValue, setDebounceValue] = useState('')
    
    const useDebounce = (value, delay = 550) => {
        

        
        useEffect (() => {
            
            const timeout =  setTimeout(() => {
                setDebounceValue(value)
            }, delay )
            
            return () => clearTimeout(timeout)
            
        }, [value])
        
        return debounceValue
    } 
    
    const debounceSearch = useDebounce(searchInput)
    
    const searchMovie = async (e) => {
        
        try {
            
            const response = await fetch(`http://localhost:3000/search?searchFor=${searchInput}`);

            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            };

            const searchData = await response.json();
            
            let searchedForArr = []
    
            for(const movie of searchData) {
                searchedForArr.push(movie.title);
            };
            
            setMovies(searchedForArr);
            console.log('made it');
            console.log(isSearching) 
            
        } catch (error) {
            console.error(error)
        }

    }
    useEffect(() => {

        if(isSearching) {
            searchMovie()
        }
    }, [debounceSearch] )


    useEffect(() => {
        if(isReleaseYear || isDuration) {
            setRating(false);
        } else if(isReleaseYear || isRating) {
            setDuration(false);
        } else if(isRating || isDuration) {
            setReleaseYear(false);
        }
    }, [isReleaseYear, isRating, isDuration])

    return (
        <header className='text-center w-5/6'>
            <div>
                <h1 className='mt-5'>NETFLIX</h1>
                <form 
                    className='flex my-5'
                    onSubmit={ (e) => {
                        e.preventDefault() 
                        setIsSearching(true);
                        searchMovie()
                    }} 
                >        
                    <input 
                        type="text" 
                        name="searchInput" 
                        className='p-2.5 mr-2.5 w-full border border-black rounded' 
                        value={searchInput}
                        onChange={ (e)=> { 
                            setIsSearching(true);
                            setSearchInput(e.target.value)
                        } } 
                    />
                    <button 
                        type="submit" 
                        className='w-1/5 border border-black rounded' 
                    >
                        Search
                    </button>
                </form>
                <div name="dropDownContainer" className='flex gap-2.5'>
                    <div name="dropDown" className='border border-black rounded p-2.5'>
                        <button onClick={() => setReleaseYear(!isReleaseYear)}>Release_year</button>
                    </div>
                    <div name="dropDown" className='border border-black rounded p-2.5'>
                        <button onClick={() => setRating(!isRating)}>Minimum_rating</button>
                    </div>
                    <div name="dropDown" className='border border-black rounded p-2.5'>
                        <button onClick={() => setDuration(!isDuration)}>Duration</button>
                    </div>
                </div>
            </div>

        </header>
    );
}

export default Header;
