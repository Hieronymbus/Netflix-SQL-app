import { stringify } from 'postcss'
import React, { useState } from 'react'

export const LoginRegisterDropDown = ( { isLoginOpen, setIsLoginOpen, isSignUpOpen, setSignUpOpen}) => {

    const [loginDetails, setLoginDetails] = useState({
        userNameEmail: "",
        password: ""
    });
    const [signUpDetails, setSignUpDetails] = useState({
        email: "",
        userName:"",
        password:"",
        confirmationPassword:""
    });

    const sendLoginData = async (e) => {
        e.preventDefault();
        try {
            
            const response =  await fetch(`${import.meta.env.VITE_PORT}/login`, {
                method : "POST"  ,
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(loginDetails),
                credentials: 'include'
            });
            const data = await response.json();

            if(response.ok) {
                console.log(data)
                
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoginOpen(false)
            setLoginDetails(prev => ({
                userNameEmail: "",
                password:""
            }))
        }


    
    }

    const sendSignupData = async (e) => {
        e.preventDefault();

        try {
            
            const response = await fetch(`${import.meta.env.VITE_PORT}/register`, {
                method : "POST" ,
                headers : {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(signUpDetails),
                credentials: 'include'
            });
            const data = await response.json()
            alert(data.message)
        } catch (error) {
            console.error(error)
        } finally {
            setSignUpOpen(false)
            setIsLoginOpen(true)
            setSignUpDetails(prev => ({
                email: "", 
                userName:"",
                password:"",
                confirmationPassword:""
            }))
        }


    }

  return (

    <div > 
        {
            isLoginOpen 
            &&
            <div className='w-3/5  border border-black rounded z-20 bg-slate-600 text-white absolute'>
                <div className='flex justify-end'>
                    <button 
                        className="bg-slate-950 rounded p-1 text-2xl border border-black "
                        onClick={() => {
                            setIsLoginOpen(false) 
                            setLoginDetails(prev => ({
                                userNameEmail: "",
                                password:""
                            }))}
                        }
                     > 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                     </button>
                </div>
                <h1 className='text-2xl'>
                    Login
                </h1>
                <form 
                    className='flex flex-col items-center '
                    onSubmit={sendLoginData} 
                >
                    <div
                        className='flex flex-col items-end gap-2 p-3'
                    >
                        <label>
                            User Name/Email: 
                            <input 
                                className='ml-2 text-black'
                                type="text" 
                                value={loginDetails.userNameEmail}
                                onChange={(e) => setLoginDetails(prev => ({
                                    ...prev, 
                                    userNameEmail: e.target.value
                                }))}
                            />   
                        </label>
                        <label>
                            Password:
                            <input 
                                className='ml-2 text-black '
                                type="text" 
                                value={loginDetails.password}
                                onChange={(e) => setLoginDetails(prev => ({
                                    ...prev, 
                                    password: e.target.value
                                }))}
                            />   
                        </label>
                    </div>
                    <button type='submit'>Log In</button>
                </form>
                <br />
                <h2 className='mb-1'>
                    dont have an account? Click  <button 
                                                    className='underline text-blue-600'
                                                    onClick={() => {
                                                        setIsLoginOpen(false);
                                                        setSignUpOpen(true);
                                                        setLoginDetails(prev => ({
                                                            userNameEmail: "",
                                                            password:""
                                                        }))}
                                                    }
                                                >
                                                    here
                                                </button> to sign up
                         
                </h2>
            </div>
        }
        {
            isSignUpOpen
            &&
            <div className='w-3/5 p-3 border border-black rounded z-20 bg-slate-600 text-white absolute'>
                <div className='flex justify-end'>
                    <button 
                        className="bg-slate-950 rounded p-1 text-2xl border border-black "
                        onClick={() => {
                            setSignUpOpen(false) 
                            setSignUpDetails(prev => ({
                                email: "", 
                                userName:"",
                                password:"",
                                confirmationPassword:""
                            }))
                        }}
                     > 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                     </button>
                </div>
                <form 
                    className='flex flex-col items-center '
                    onSubmit={ sendSignupData} 
                    >
                        <h1 className='text-2xl'>
                            Sign Up
                        </h1>
                    <div
                        className='flex flex-col items-end gap-2 p-3'
                    >
                        <label>
                            Email: 
                            <input 
                                className='ml-2 text-black'
                                type="text" 
                                value={signUpDetails.email}
                                onChange={(e) => setSignUpDetails(prev => ({
                                    ...prev, 
                                    email: e.target.value
                                }))}
                            />   
                        </label>
                        <label>
                            User Name: 
                            <input 
                                className='ml-2 text-black'
                                type="text" 
                                value={signUpDetails.userName}
                                onChange={(e) => setSignUpDetails(prev => ({
                                    ...prev, 
                                    userName: e.target.value
                                }))}
                            />   
                        </label>
                        <label>
                            Password:
                            <input 
                                className='ml-2 text-black'
                                type="text" 
                                value={signUpDetails.password}
                                onChange={(e) => setSignUpDetails(prev => ({
                                    ...prev, 
                                    password: e.target.value
                                }))}
                            />   
                        </label>
                        <label>
                            Confirm Password: 
                            <input 
                                className='ml-2 text-black'
                                type="text" 
                                value={signUpDetails.confirmationPassword}
                                onChange={(e) => setSignUpDetails(prev => ({
                                    ...prev, 
                                    confirmationPassword: e.target.value
                                }))}
                            />   
                        </label>
                    </div>
                    <button type='submit'>Register</button>
                </form>
                <br />
                <h2>
                   <button 
                        className='pb-1'
                        onClick={() => {
                            setSignUpOpen(false);
                            setSignUpDetails(prev => ({
                                email: "", 
                                userName:"",
                                password:"",
                                confirmationPassword:""
                            }));
                    }}
                    >
                        Cancel 
                    </button> 
                         
                </h2>
            </div>
        }
    </div>

  )
}
