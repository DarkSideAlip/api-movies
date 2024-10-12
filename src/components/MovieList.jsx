import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HeartIcon } from '@heroicons/react/solid';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/outline';
import Favorites from '../pages/Favorites';

const MovieList = ({ movies1 }) => {

    // Ezy
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (movie) => {
        let updatedFavorites;
        if (favorites.some(fav => fav.id === movie.id)) {
            updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
        } else {
            updatedFavorites = [...favorites, movie];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
    

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const initializeFavorites = () => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    };
    
    useEffect(() => {
        initializeFavorites();
    }, []);
    

    useEffect(() => {

        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/movie/popular?api_key=ae5827f0134467271b010c77c15455ec'
                );
                setMovies(response.data.results);
            } catch (err) {
                setError('Failed to fetch movies');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return <div>Loading ...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1 className='text-4xl font-bold text-center text-blue-500 p-6 mb-3 shadow-lg'>Popular Movies</h1>
            <div className='flex justify-center items-center min-h-screen bg-gray-100'>
                <ul className='grid grid-cols-6 gap-4 list-none p-0'>
                    {movies.map(movie => (
                        <li key={movie.id} className='relative flex flex-col items-center justify-center bg-white p-4 rounded shadow'>
                            <button 
                                className='absolute top-2 right-2'
                                onClick={() => toggleFavorite(movie)}
                            >
                                {favorites.some(fav => fav.id === movie.id) ? (
                                    <HeartIcon className='h-6 w-6 text-red-500' />
                                ) : (
                                    <OutlineHeartIcon className='h-6 w-6 text-gray-500' />
                                )}
                            </button>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt="{movie.title}"
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

export default MovieList;
