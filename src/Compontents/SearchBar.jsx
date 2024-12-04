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
    if (isSearching) {
      fetchSearchedMovie();
      setItemCount(12); //keep this
    }
  }, [debounceSearch]);

  return (
    <div className="mt-10">
      <form
        className="flex my-5 relative"
        onSubmit={(e) => {
          e.preventDefault();
          setIsSearching(true);
          setItemCount(12);
        }}
      >
        <input
          type="text"
          name="searchInput"
          className="p-2.5 mr-2.5 w-full border border-black rounded"
          value={searchInput}
          onChange={(e) => {
            setIsSearching(true);
            setSearchInput(e.target.value);
            if (e.target.value === "") {
              setIsSearching(false);
            }
          }}
        />

        <button type="submit" className="text-slate-100 bg-cyan-600  flex justify-center items-center  border border-black hover:bg-slate-600  size-12 aspect-square rounded ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
