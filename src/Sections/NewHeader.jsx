import { useState, useEffect } from "react";
import FilterDropDown from "../Compontents/FilterDropDown01";

function Header({ setFilterValue, fetchSearchedMovie, setSearchInput, searchInput, setReleaseYearFilter, setRatingFilter, setDurationFilter, isSearching, setIsSearching }) {
  const [debounceValue, setDebounceValue] = useState("");
  const [isDropDown, setIsDropDown] = useState(false);

  const [durationFilterValue, setDurationFilterValue] = useState();
  const [ratingFilterValue, setRatingFilterValue] = useState();
  const [releaseYearFilterValue, setReleaseYearFilterValue] = useState();

  const useDebounce = (value, delay = 550) => {
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
    }
  }, [debounceSearch]);

  function handleClick(arg) {
    if (arg === "year") {
      setYearDropDown(true);
      setRatingDropDown(false);
      setDurationDropDown(false);
    } else if (arg === "rating") {
      setRatingDropDown(true);
      setDurationDropDown(false);
      setYearDropDown(false);
    } else {
      setDurationDropDown(true);
      setYearDropDown(false);
      setRatingDropDown(false);
    }
  };

  function closeDropDown(e) {
    e.preventDefault();
    setIsDropDown(false);
  };

  function generateFilterValue() {
    setFilterValue({
      durationValue: durationFilterValue || null,
      releaseYearValue: releaseYearFilterValue || null,
      ratingValue: ratingFilterValue || null,
    });
  }

  return (
    <header className="text-center w-5/6">
      <div>
        <h1 className="mt-5">NETFLIX</h1>
        <form
          className="flex my-5 relative"
          onSubmit={(e) => {
            e.preventDefault();
            setIsSearching(true);
          }}
        >
            <div name="dropDownContainer" className={`${isDropDown ? '' : 'hidden'} absolute z-50 pb-10 px-10 h-fit bg-black flex w-full gap-2.5`}>
                <FilterDropDown onHandleCloseDropDown={closeDropDown} />
            </div>

          <input
            type="text"
            name="searchInput"
            className="p-2.5 mr-2.5 w-full border border-black rounded"
            value={searchInput}
            onChange={(e) => {
              setIsSearching(true);
              setSearchInput(e.target.value);
            }}
          />
          <button type="submit" onClick={() => setIsDropDown(true)} className="flex justify-center items-center size-12 aspect-square border border-black rounded">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
          </button>
          <button type="submit" className="w-1/5 border border-black rounded">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
