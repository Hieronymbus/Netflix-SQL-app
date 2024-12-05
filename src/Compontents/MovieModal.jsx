import React, { useState, useEffect, user } from "react";


const MovieModal = ( { token, setIsModalFor, isModalFor, user,setShowFavs } ) => {
   const [isLoadingDetails, setIsLoadingDetails] = useState(false)
   const [movieDetails, setMovieDetails ] = useState({
      title:"",
      type:"",
      show_id:"",
      release_year:"",
      listed_in:"",
      rating:"",
      cast_members:"",
      director:"",
      country:"",
      duration:"",
      date_added:"",
      description:""
      
   })

   async function fetchOneMoviesDetails(title) {
        

      try {
         
         const response = await fetch(`${import.meta.env.VITE_PORT}/oneMovieDetails/?movieTitle=${encodeURIComponent(title)}`)
         const data = await response.json()
         setMovieDetails(prev => ({
             ...prev,
             title: data[0].title,
             type:data[0].type,
             show_id:data[0].show_id,
             release_year:data[0].release_year,
             listed_in:data[0].listed_in,
             rating:data[0].rating,
             cast_members:data[0].cast_members,
             director:data[0].director,
             country:data[0].country,
             duration:data[0].duration,
             date_added:data[0].date_added,
             description:data[0].description
   
         }))
      } catch (error) {
         console.error("Error fetching Details:", error)
      } finally {
         setIsLoadingDetails(false)
      }
        
   }

   useEffect(() => {
      setIsLoadingDetails(true)
      if(isModalFor) fetchOneMoviesDetails(isModalFor)   

   }, [isModalFor]);

   async function addToFavourites() {
      await fetch('http://localhost:3000/favourites', {
         method: 'POST',
         headers: {
            "Content-Type": "application/json",
         },       
         body: JSON.stringify(movieDetails)
      });
   };
 

   async function addMovieToFavourites (showId) {

         const body ={
            show_id: showId,
            user_id: user.id
         }

         await fetch(`${import.meta.env.VITE_PORT}/favourites/add_favourites`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
         })
    

   }
   return (
      
      <div 
         className="
                     w-4/5 h-3/4 z-20 bg-slate-600 text-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     rounded border border-black shadow-2xl  flex flex-col gap-2 overflow-scroll no-scrollbar 
                  "
      >  
         {
            isLoadingDetails 
            ?
            <div className="flex justify-between">
                  <div className="pl-5 pt-2 ">
                     <h2 
                        className="text-2xl"
                     >
                        LOADING details..
                     </h2>
                  </div>
                  <div>
                     <button 
                        className="bg-slate-950 rounded p-1 text-2xl border border-black "
                        onClick={ () => {setIsModalFor("")} }
                     > 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                     </button>
                  </div>
               </div>
            :
            <div>
               <div className="flex justify-between">
                  <div className="pl-5 pt-2 ">
                     <h2 className="text-3xl " >
                        {movieDetails.title}
                     </h2>
                     <p>
                        {movieDetails.type} / {movieDetails.duration}
                     </p>
                     
                  </div>
                  <div>
                     <button 
                        className="bg-slate-950 rounded p-1 text-2xl border border-black "
                        onClick={ () => setIsModalFor("") }
                     > 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                     </button>
                  </div>
               </div>
               <div className="p-5 flex flex-col gap-3">
                  <h2>
                     <span className="text-xl">Release Year: </span> 
                     { movieDetails.release_year ? <span>{movieDetails.release_year}</span>  : <span>N/A</span> } 
                  </h2>
                  <h2>
                     <span className="text-xl">Country:  </span> 
                     { movieDetails.country ? <span>{movieDetails.country}</span>  : <span>N/A</span> } 
                  </h2>
                  <h2>
                     <span className="text-xl">Description: </span> 
                     { movieDetails.description ? <span>{movieDetails.description}</span>  : <span>N/A</span> } 
                  </h2>
                  <h2>
                     <span className="text-xl">Cast:  </span> 
                     { movieDetails.cast_members ? <span>{movieDetails.cast_members}</span>  : <span>N/A</span> } 
                  </h2>
                  <h2>
                     <span className="text-xl">Director:  </span> 
                     { movieDetails.director ? <span>{movieDetails.director}</span>  : <span>N/A</span> } 
                  </h2>
                  <h2>
                     <span className="text-xl">Rating:  </span> 
                     { movieDetails.rating ? <span>{movieDetails.rating}</span>  : <span>N/A</span> } 
                  </h2>
                  <h2>
                     <span className="text-xl">Genre:  </span> 
                     { movieDetails.listed_in ? <span>{movieDetails.listed_in}</span>  : <span>N/A</span> } 
                  </h2>
                  <h2>
                     <span className="text-xl">Date Added:  </span> 
                     { movieDetails.date_added ? <span>{movieDetails.date_added}</span>  : <span>N/A</span> } 
                  </h2>
                  {
                     user
                     &&
                     <button
                           className="bg-slate-800 rounded p-1 text-2xl border  "
                           onClick={()=>{
                              addMovieToFavourites(movieDetails.show_id)
                              
                           }}
                     >
                        Add to favourites
                     </button>
                  }
               </div>
               
            </div>
         }
      </div>
  )
}

export default MovieModal