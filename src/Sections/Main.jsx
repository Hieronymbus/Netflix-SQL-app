import React from 'react';

function Main() {

    const movies = ['The Starling', 'Bright Star', 'The Least Expected Day: Inside the...', 'Star Trek'];

    return(
        <main className='w-5/6'>
            <ul className='flex gap-2.5'>
                {movies.map((movie, index) => {

                    return (
                        <li key={index} className='p-5 w-1/4 h-72 border border-black rounded flex justify-center items-center text-center'>
                            <div>
                                <h1>{movie}</h1>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </main>
    );
}

export default Main;