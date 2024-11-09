import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MovieChart = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/movie/popular?api_key=ae5827f0134467271b010c77c15455ec'
                );
                setMovies(response.data.results);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch movies');
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

    // Prepare data for chart
    const movieTitles = movies.map((movie) => movie.title);
    const moviePopularity = movies.map((movie) => movie.popularity);

    const data = {
        labels: movieTitles,
        datasets: [
            {
                label: 'Popularity',
                data: moviePopularity,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Movie Popularity Chart',
            },
        },
    };

    return (
        <div className='max-w-5xl w-full bg-white p-8 rounded-lg shadow-lg'>
            <Bar data={data} options={options} />
        </div>
    );
};

export default MovieChart;