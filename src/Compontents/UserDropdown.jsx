import React from 'react'

const UserDropdown = ({isUserProfileOpen, setIsUserProfileOpen, user, setUser}) => {


    async function sendLogoutRequest () {

        const response = await fetch(` ${import.meta.env.VITE_PORT}/logout`, {
            method: 'POST',
            headers: {
                "Content-Type" : "aplication/json"
            },
            credentials: 'include'
        })
        const data = await response.json()
        alert(data.message)
        setIsUserProfileOpen(false)
        setUser("")
    }

  return (
    <div>
        {
            isUserProfileOpen 
            &&
            <div className='w-3/5  border border-black rounded z-20 bg-slate-600 text-white absolute'>
                <div className='flex justify-end'>
                    <button 
                        className="bg-slate-950 rounded p-1 text-2xl border border-black "
                        onClick={() => {
                            setIsUserProfileOpen(false)
                        }}
                     > 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                     </button>
                </div>
                <h2 className='text-2xl'>
                    {user.username}
                </h2>

                <button>
                  View Your Favourites
                </button>
                <br />
                <br />
                <br />
                <button
                    onClick={sendLogoutRequest}
                >
                    Log out
                </button>
            </div>
        }
    </div>
  )
}

export default UserDropdown