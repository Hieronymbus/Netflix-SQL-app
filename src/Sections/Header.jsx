import { useState, useEffect } from "react";
import FilterOptions from "../Compontents/FilterOptions";
import SearchBar from "../Compontents/SearchBar";

function Header({ setToken, setFilterValue, fetchSearchedMovie, setSearchInput, searchInput, isSearching, setIsSearching, setItemCount }) {
  const [isDropDown, setIsDropDown] = useState(false);
  
  const [durationValue, setDurationValue] = useState();
  const [ratingValue, setRatingValue] = useState();
  const [releaseYearValue, setReleaseYearValue] = useState();
  
  function closeDropDown(e) {
    e.preventDefault();
    setIsDropDown(false);
  };

  function generateValue() {
    setFilterValue({
      durationValue: durationValue || null,
      releaseYearValue: releaseYearValue || null,
      ratingValue: ratingValue || null,
    });

    setDurationValue();
    setRatingValue();
    setReleaseYearValue();
    setIsDropDown(false);
  };

  async function selectUser(arg) {
    let token;
    if(arg === 'user1'){
      token = 'Ep9dgUtppo3dAjzf4GqDbWGG';
      console.log('User 1 is active');
    } else {
      token = 'xKmUwizGSZm5dirMobXj6iQb';
      console.log('User 2 is active');
    };

    await fetch('http://localhost:3000/authenticate', {
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${token}`
      }
    });

    setToken(token);
  };

  return (
    <header className="w-full text-center ">
      <div className='absolute left-5 top-5'>
        <button className='rounded bg-slate-600 text-white p-2.5 mr-5' onClick={() => selectUser('user1')}>User 1</button>
        <button className='rounded bg-slate-600 text-white p-2.5' onClick={() => selectUser('user2')}>User 2</button>
      </div>
      <div>
        <h1 className="text-5xl text-red-600 font-mono">NETFLIX APP</h1>
        <SearchBar 
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          setItemCount={setItemCount}
          fetchSearchedMovie={fetchSearchedMovie}
        />
        <div className="relative">
          <div name="dropDownContainer" className={`${isDropDown ? '' : 'hidden'} absolute top-12 z-50 pb-10 p-10 h-fit bg-slate-600 rounded border border-black flex w-full gap-2.5`}>
              <FilterOptions onHandleCloseDropDown={closeDropDown} generateValue={generateValue} setDurationValue={setDurationValue} setRatingValue={setRatingValue} setReleaseYearValue={setReleaseYearValue} />
          </div>
          <button type="submit" onClick={() => setIsDropDown(!isDropDown)} className="text-slate-100 bg-cyan-600 flex justify-center items-center size-12 aspect-square border border-black rounded hover:bg-slate-600 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
}

export default Header;
