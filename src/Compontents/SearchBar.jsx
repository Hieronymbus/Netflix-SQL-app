import React from "react";
import { useState, useEffect } from "react";
const SearchBar = ({ searchInput, setSearchInput, isSearching, setIsSearching, setItemCount, fetchSearchedMovie }) => {
  const useDebounce = (value, delay = 550) => {
    const [debounceValue, setDebounceValue] = useState("");
    useEffect(() => {
      const timeout = setTimeout(() => {
        setDebounceValue(value);
      }, delay);

      return () => clearTimeout(timeout);
    }, [value]); 

    return debounceValue;
  };
  const debounceSearch = useDebounce(searchInput);

  useEffect(() => {
    if(debounceSearch.trim() === "" || searchInput.trim() === "") {
      setIsSearching(false);
    };
    if (isSearching) {
      fetchSearchedMovie();
      setItemCount(prev => ({
        searchcount: 12,
        movieCount: prev.movieCount,
        showCount: prev.showcount
      })); //keep this
    };
  }, [debounceSearch]);

  return (
    <div className="w-1/2 my-10">
      <form
        className="flex relative"
        onSubmit={(e) => {
          e.preventDefault();
          setIsSearching(true);
          setItemCount(prev => ({
            searchcount: 12,
            movieCount: prev.movieCount,
            showCount: prev.showcount
          }));
        }}
      >
        <input
          type="text"
          name="searchInput"
          className="p-2.5 text-red-800 focus:text-red-950 bg-red-950 focus:outline-0 focus:bg-red-800 w-full border border-r-0 border-black rounded rounded-r-none"
          value={searchInput}
          onChange={(e) => {
            setIsSearching(true);
            setSearchInput(e.target.value);
            if (e.target.value === "") {
              setIsSearching(false);
              console.log(isSearching);
            };
          }}
        />
        <button type="submit" className="text-red-800 hover:text-red-950 bg-red-950 hover:bg-red-800 flex justify-center items-center border border-l-0 border-black size-12 aspect-square rounded rounded-l-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
