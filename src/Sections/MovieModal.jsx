import React, { useState, useEffect } from "react";


const MovieModal = ( { setIsModalFor, isModalFor } ) => {
   
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
        
        const response = await fetch(`http://localhost:3000/oneMovieDetails/?movieTitle=${title}`)
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
        console.log(data[0])
   }

   useEffect(() => {
      
      if(isModalFor) fetchOneMoviesDetails(isModalFor)   

   }, [isModalFor])

   return (
      
      <div 
         className="w-2/3 h-2/3 bg-slate-600 text-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-black flex flex-col gap-2 overflow-scroll"
      >  
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
               X
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

      </div>

      </div>
  )
}

export default MovieModal