import React, { useState, useEffect } from "react";

const PORT = 3000;

const MovieModal = ({ fetchFavouriteMovies, fetchFavourites, netflixUser, token, setIsModalFor, isModalFor }) => {
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    type: "",
    show_id: "",
    release_year: "",
    listed_in: "",
    rating: "",
    cast_members: "",
    director: "",
    country: "",
    duration: "",
    date_added: "",
    description: "",
  });

  useEffect(() => {
   setIsLoadingDetails(true);
   if (isModalFor) fetchOneMoviesDetails(isModalFor);
 }, [isModalFor]);

  async function fetchOneMoviesDetails(title) {
    try {
      const response = await fetch(`${import.meta.env.VITE_PORT}/oneMovieDetails/?movieTitle=${encodeURIComponent(title)}`);
      const data = await response.json();
      setMovieDetails(prev => ({...prev, ...data[0]}));
    } catch (error) {
      console.error("Error fetching Details:", error);
    } finally {
      setIsLoadingDetails(false);
    };
  };

  async function addToFavourites(id) {
    setIsModalFor("");
    if (!netflixUser) return;
    try {
      const response = await fetch("http://localhost:3000/add-favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movieId: id,
          username: netflixUser.username,
        }),
      });
      console.log(await response.json());
    } catch (err) {
      console.error(err);
    }
  };

  async function removeFromFavourites(id) {
    setIsModalFor("");
    if(!id) {
      console.error('No show id');
      return;
    };
    console.log('Remove from favourites');
    const response = await fetch(`http://localhost:${PORT}/remove-favourite/${id}/${netflixUser.userId}`, {method: 'DELETE'});
        await fetchFavouriteMovies();
    const data = await response.json();
    console.log('Remove from favourites response: ', data);
    console.log('yo');                         
  };

  return (
    <div
      className="
                  w-4/5 h-3/4 z-20 bg-slate-600 text-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  rounded border border-black shadow-2xl  flex flex-col gap-2 overflow-scroll no-scrollbar 
                  "
    >
      {isLoadingDetails ? (
        <div className="flex justify-between">
          <div className="pl-5 pt-2 ">
            <h2 className="text-2xl">LOADING details...</h2>
          </div>
          <div>
            <button className="bg-slate-950 rounded p-1 text-2xl border border-black " onClick={() => setIsModalFor("")}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between">
            <div className="pl-5 pt-2 ">
              <h2 className="text-3xl ">{movieDetails.title}</h2>
              <p>
                {movieDetails.type} / {movieDetails.duration}
              </p>
            </div>
            <div>
              {fetchFavourites && <button onClick={() => removeFromFavourites(movieDetails.show_id)} className="bg-slate-950 rounded p-1 text-2xl border border-black">remove from favourites</button>}
              {!fetchFavourites && <button onClick={() => addToFavourites(movieDetails.show_id)} className="bg-slate-950 rounded p-1 text-2xl border border-black">
                  Add to favourites
                </button>
              }  
              <button className="bg-slate-950 rounded p-1 text-2xl border border-black " onClick={() => setIsModalFor("")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-5 flex flex-col gap-3">
            <h2>
              <span className="text-xl">Release Year: </span>
              {movieDetails.release_year ? <span>{movieDetails.release_year}</span> : <span>N/A</span>}
            </h2>
            <h2>
              <span className="text-xl">Country: </span>
              {movieDetails.country ? <span>{movieDetails.country}</span> : <span>N/A</span>}
            </h2>
            <h2>
              <span className="text-xl">Description: </span>
              {movieDetails.description ? <span>{movieDetails.description}</span> : <span>N/A</span>}
            </h2>
            <h2>
              <span className="text-xl">Cast: </span>
              {movieDetails.cast_members ? <span>{movieDetails.cast_members}</span> : <span>N/A</span>}
            </h2>
            <h2>
              <span className="text-xl">Director: </span>
              {movieDetails.director ? <span>{movieDetails.director}</span> : <span>N/A</span>}
            </h2>
            <h2>
              <span className="text-xl">Rating: </span>
              {movieDetails.rating ? <span>{movieDetails.rating}</span> : <span>N/A</span>}
            </h2>
            <h2>
              <span className="text-xl">Genre: </span>
              {movieDetails.listed_in ? <span>{movieDetails.listed_in}</span> : <span>N/A</span>}
            </h2>
            <h2>
              <span className="text-xl">Date Added: </span>
              {movieDetails.date_added ? <span>{movieDetails.date_added}</span> : <span>N/A</span>}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieModal;
