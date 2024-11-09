import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='bg-blue-600 p-4 text-white shadow-lg'>
            <div className='container mx-auto flex justify-between items-center'>
                <Link to='/' className='text-2xl font-bold'>MovieApp</Link>
                <div className='flex space-x-4'>
                    <Link to='/' className='hover:underline'>Home</Link>
                    <Link to='/favorites' className='hover:underline'>Favorites</Link>
                    <Link to='/chart' className='hover:underline'>Popularity Chart</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;