
import { useState, useEffect } from "react";

function Header({ setMovies, setIsSearching, isReleaseYear, setReleaseYear, isRating, setRating, isDuration, setDuration }) {
    useEffect(() => {
        if(isReleaseYear || isDuration) {
            setRating(false);
        } else if(isReleaseYear || isRating) {
            setDuration(false);
        } else if(isRating || isDuration) {
            setReleaseYear(false);
        }
    }, [isReleaseYear, isRating, isDuration]);

    const [searchInput, setSearchInput] = useState('')
    
    const useDebounce = (value, delay = 550) => {
        
        const [debounceValue, setDebounceValue] = useState('')
        
        useEffect (() => {           
            const timeout =  setTimeout(() => {               
                setDebounceValue(value);             
            }, delay )        
            return () => clearTimeout(timeout)    
        }, [value]);
        return debounceValue;
    } 
    
    const debounceSearch = useDebounce(searchInput)
    
    const searchMovie = async (e) => {
         
        const response = await fetch(`http://localhost:3000/search?searchFor=${searchInput}`);
        const searchData = await response.json();

        console.log(searchData);

        let searchedForArr = []

        for(const movie of searchData) {
            searchedForArr.push(movie.title);
        };

        
        setMovies(searchedForArr);
    }
    useEffect(() => {

        searchMovie()

    }, [debounceSearch] )

    return (
        <header className='text-center w-5/6'>
            <div>
                <h1 className='mt-5'>NETFLIX</h1>
                <form 
                    className='flex my-5'
                    onSubmit={ (e) => {
                        e.preventDefault() 
                        setIsSearching(true)
                        searchMovie()
                    }} 
                >        
                    <input 
                        type="text" 
                        name="searchInput" 
                        className='p-2.5 mr-2.5 w-full border border-black rounded' 
                        value={searchInput}
                        onChange={ (e)=> { 
                            setSearchInput(e.target.value)
                            setIsSearching(true)
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
