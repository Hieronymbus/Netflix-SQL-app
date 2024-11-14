
import { useState, useEffect } from "react";
import FilterDropDown from "../Compontents/FilterDropDown";


function Header({ setFilterValue, isRatingFilter, isReleaseYearFilter, isDurationFilter, setReleaseYearFilter, setRatingFilter, setDurationFilter, isSearching, setIsSearching, setMovies }) {

    const [searchInput, setSearchInput] = useState('');
    const [debounceValue, setDebounceValue] = useState('');
    const [yearDropDown, setYearDropDown] = useState(false);
    const [ratingDropDown, setRatingDropDown] = useState(false);
    const [durationDropDown, setDurationDropDown] = useState(false);

    const useDebounce = (value, delay = 550) => {
        useEffect (() => {
            
            const timeout =  setTimeout(() => {
                setDebounceValue(value)
            }, delay )
            
            return () => clearTimeout(timeout)
            
        }, [value])
        
        return debounceValue
    };
    const debounceSearch = useDebounce(searchInput);

    useEffect(() => {
        if(isSearching) {
            searchMovie();
        };
    }, [debounceSearch] );
    
    const searchMovie = async () => {
        
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
        } catch (error) {
            console.error(error)
        }

    };

    function handleClick(arg) {
        if(arg === 'year') {
            setYearDropDown(true);
            setRatingDropDown(false);
            setDurationDropDown(false);
        } else if(arg === 'rating') {
            setRatingDropDown(true);
            setDurationDropDown(false);
            setYearDropDown(false);
        } else {
            setDurationDropDown(true);
            setYearDropDown(false);
            setRatingDropDown(false);
        };
    }
    return (
        <header className='text-center w-5/6'>
            <div>
                <h1 className='mt-5'>NETFLIX</h1>
                <form 
                    className='flex my-5'
                    onSubmit={ (e) => {
                        e.preventDefault() 
                        setIsSearching(true);   
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
                    <div name="dropDown" className='relative border border-black rounded p-2.5'>
                        <button onClick={() => handleClick('year')}>Release_year</button>
                        <FilterDropDown setFilterValue={setFilterValue} options={[1990, 2000, 2010, 2020]} setIsState={() => { setReleaseYearFilter(true); setDurationFilter(false); setRatingFilter(false); }} setShown={setYearDropDown} isShown={yearDropDown}/>
                    </div>
                    <div name="dropDown" className='relative border border-black rounded p-2.5'>
                        <button onClick={() => handleClick('rating')}>Minimum_rating</button>
                        <FilterDropDown setFilterValue={setFilterValue} options={['PG-13', 'R', 'TV-MA', 'PG', 'TV-14']} setIsState={() => { setRatingFilter(true); setReleaseYearFilter(false); setDurationFilter(false); }} setShown={setRatingDropDown} isShown={ratingDropDown}/>
                    </div>
                    <div name="dropDown" className='relative border border-black rounded p-2.5'>
                        <button onClick={() => handleClick('duration')}>Duration</button>
                        <FilterDropDown setFilterValue={setFilterValue} options={['1 Season', '2 Seasons', '125 min']} setIsState={() => { setDurationFilter(true); setReleaseYearFilter(false); setRatingFilter(false); }} setShown={setDurationDropDown} isShown={durationDropDown}/>
                    </div>
                </div>
            </div>

        </header>
    );
}

export default Header;
