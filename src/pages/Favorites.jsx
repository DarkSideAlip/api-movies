import React, { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';

const Favorites = () => {

    // Ezy bar
    // Test Git hub
    // Test New CMD
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);

    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-10">Favorites</h1>
            <div className='flex justify-center items-center min-h-screen bg-gray-100'>
                <ul className='grid grid-cols-6 gap-4 list-none p-0'>
                    {favorites.map((movie) => (
                        <li key={movie.id} className='relative flex flex-col items-center justify-center bg-white p-4 rounded shadow'>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className='w-48 h-auto rounded'
                            />
                            <h2 className='mt-2'>{movie.title}</h2>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Favorites;