// Chart Page (pages/ChartPage.js)
import React from 'react';
import Navbar from '../components/Navbar';
import MovieChart from '../components/MovieChart';

const Chart = () => {
    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center p-6 bg-gray-100 min-h-screen'>
                <h1 className='text-4xl font-bold text-center text-blue-500 p-6 mb-3 shadow-lg'>Movie Popularity Chart</h1>
                <MovieChart />
            </div>
        </>
    );
};

export default Chart;
