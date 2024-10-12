import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='bg-blue-600 p-4 shadow-lg'>
            <ul className='flex justify-around'>
                <li>
                    <Link to='/' className='text-white text-lg font-semibold'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to='/favorites' className='text-white text-lg font-semibold'>
                        Favorites
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;