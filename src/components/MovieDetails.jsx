import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) {
            console.error('Invalid movie ID:', id);
            setError('Invalid movie ID');
            setLoading(false);
            return;
        }

        const fetchMovieDetails = async () => {
            try {
                console.log('Fetching movie details for ID:', id); // ตรวจสอบ id ที่ได้รับ
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=ae5827f0134467271b010c77c15455ec&language=en-US`
                );
                console.log('Movie details response:', response); // ตรวจสอบการตอบกลับจาก API
                if (response.data && response.data.title) {
                    setMovie(response.data);
                    console.log('Movie data set successfully:', response.data);
                } else {
                    console.error('No movie details found for ID:', id);
                    setError('No movie details found');
                }
            } catch (err) {
                console.error('Failed to fetch movie details:', err); // เพิ่ม log สำหรับข้อผิดพลาด
                setError('Failed to fetch movie details');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return <div className='flex items-center justify-center min-h-screen'>Loading ...</div>;
    }

    if (error) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen text-red-500'>
                <p>{error}</p>
                <button
                    onClick={() => navigate('/')}
                    className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
                >
                    Go to Home
                </button>
            </div>
        );
    }

    const movieData = {
        title: movie?.title || 'N/A',
        release_date: movie?.release_date || 'N/A',
        vote_average: movie?.vote_average || 'N/A',
        overview: movie?.overview || 'No overview available',
        genres: movie?.genres?.length > 0 ? movie.genres.map(genre => genre.name).join(', ') : 'N/A',
        runtime: movie?.runtime ? `${movie.runtime} minutes` : 'N/A',
        tagline: movie?.tagline || 'N/A',
    };

    return (
        <div className='flex flex-col items-center p-6 bg-gray-100 min-h-screen'>
            <div className='max-w-4xl w-full bg-white p-8 rounded-lg shadow-xl'>
                <div className='flex flex-col md:flex-row gap-8'>
                    {movie?.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movieData.title}
                            className='w-full md:w-1/3 h-auto rounded-lg shadow-lg'
                        />
                    ) : (
                        <div className='w-full md:w-1/3 h-64 flex items-center justify-center bg-gray-200 rounded-lg'>No Image Available</div>
                    )}
                    <div className='flex-1 text-left'>
                        <h1 className='text-5xl font-bold mb-4 text-blue-600'>{movieData.title}</h1>
                        <p className='italic text-lg text-gray-500 mb-4'>{movieData.tagline}</p>
                        <p className='mb-4'><strong>Release Date:</strong> {movieData.release_date}</p>
                        <p className='mb-4'><strong>Rating:</strong> {movieData.vote_average}</p>
                        <p className='mb-4'><strong>Genres:</strong> {movieData.genres}</p>
                        <p className='mb-4'><strong>Runtime:</strong> {movieData.runtime}</p>
                        <p className='mb-4'><strong>Overview:</strong> {movieData.overview}</p>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <button
                        onClick={() => navigate('/')}
                        className='mt-8 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700'
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;