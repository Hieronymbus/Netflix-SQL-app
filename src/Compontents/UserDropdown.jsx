import React from 'react'

const UserDropdown = () => {


    async function sendLogoutRequest () {

        const response = await fetch(` ${import.meta.env.VITE_PORT}/logout`, {
            method: 'POST',
            headers: {
                "Content-Type" : "aplication/json"
            },
            credentials: 'include'
        })
    }

  return (

    <div className='w-3/5  border border-black rounded z-20 bg-slate-600 text-white absolute'>
        
        <button>
            Favourites
        </button>
        <button
            onClick={sendLogoutRequest}
        >
            Log out
        </button>
    </div>


  )
}

export default UserDropdown