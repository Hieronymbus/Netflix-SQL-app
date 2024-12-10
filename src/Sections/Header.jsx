import { useState, useEffect } from "react";
import FilterOptions from "../Compontents/FilterOptions";
import SearchBar from "../Compontents/SearchBar";
import Register_Login from '../Compontents/Register_Login.jsx';
import SettingModal from "../Compontents/SettingModal.jsx";

function Header({ setMovies, movies, setFetchFavourites, fetchFavourites, setToken, setNetflixUser, netflixUser, setIsModalFor, isModalFor, setFilterValue, fetchSearchedMovie, setSearchInput, searchInput, isSearching, setIsSearching, setItemCount }) {
  const [isDropDown, setIsDropDown] = useState(false);
  const [durationValue, setDurationValue] = useState();
  const [ratingValue, setRatingValue] = useState();
  const [releaseYearValue, setReleaseYearValue] = useState();
  const [registerLoginModal, setRegisterLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [settingModal, setSettingModal] = useState();
  
  function closeDropDown(e) {
    e.preventDefault();
    setIsDropDown(false);
  };

  //generate values for Filter values
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

  //Submit registration form values
  function updateValues(e, type) {
    e.preventDefault();
    setSettingModal(false);
    if(type != null && type == "signup") {
      if(value.password === value.confirmPassword) {
        register(); 
      } else {
        alert('Passwords do not match');
      };
    } else {
      login();
    }
  };

  async function login() {
    setLoginForm(false);
    try{
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: value.username, password: value.password }),
      });
      const data = await response.json();

      //Reset form values
      if(response.ok) {
        setValue(prev => {
          const newValues = {};
          Object.keys(prev).forEach((key) => prev[key] = '');
          return newValues;
        });

        console.log(data);

        setRegisterLoginModal(false);
      };

      localStorage.setItem('user', JSON.stringify(data.user));
      setToken(data.token);
      console.log(data.token);
      setNetflixUser(data.user);
    } catch(err) {
      console.error(err);
    };
  };

  function logout() {
    setNetflixUser();
    setSettingModal(false);
    setFetchFavourites(false);
    setToken();
  };

  async function register() {
    setRegisterLoginModal(false);
    setSignup(false);

    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value)
    });

      setValue(prev => {
        const newValues = {};
        Object.keys(prev).forEach((key) => newValues[key] = "");
        return newValues;
      });
  };

  function closeProfileModal() {
    setRegisterLoginModal(false);
    setSignup(false);
    setLoginForm(false);
  };

  let settingModalText;
  if(netflixUser) {
    const firstChar = netflixUser.username[0];
    settingModalText = firstChar.toUpperCase();
  } else {
    settingModalText = '?';
  };

  return (
    <header className="relative w-full text-center">
      <div className='flex w-full justify-between'>
        <button className='size-20 text-3xl rounded-full bg-slate-600 text-white cursor-pointer' onClick={() => setSettingModal(true)}>{settingModalText}</button>
        {settingModal && <SettingModal netflixUser={netflixUser} setIsModalFor={setIsModalFor} logout={logout} setSettingModal={setSettingModal} fetchFavourites={fetchFavourites} setFetchFavourites={setFetchFavourites} setSignup={setSignup} setLoginForm={setLoginForm} movies={movies} setMovies={setMovies} />}
        {signup && <Register_Login value={value} setValue={setValue} updateValues={updateValues} signup={signup} closeProfileModal={closeProfileModal} />}
        {loginForm && <Register_Login value={value} setValue={setValue} updateValues={updateValues} closeProfileModal={closeProfileModal} />}
        <h1 className="text-5xl text-red-600 font-mono">NETFLIX APP</h1>
        <div className="relative">
          <div name="dropDownContainer" className={`${isDropDown ? '' : 'hidden'} absolute z-20 pb-10 p-10 h-fit right-full top-0 bg-slate-600 rounded border border-black flex w-screen gap-2.5`}>
              <FilterOptions onHandleCloseDropDown={closeDropDown} generateValue={generateValue} setDurationValue={setDurationValue} setRatingValue={setRatingValue} setReleaseYearValue={setReleaseYearValue} />
          </div>
          <button type="submit" onClick={() => setIsDropDown(!isDropDown)} className="text-slate-100 bg-cyan-600 flex justify-center items-center size-12 aspect-square border border-black rounded hover:bg-slate-600 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
          </button>
        </div>
      </div>
      <SearchBar 
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        setItemCount={setItemCount}
        fetchSearchedMovie={fetchSearchedMovie}
      />
    </header>
  );
}

export default Header;
