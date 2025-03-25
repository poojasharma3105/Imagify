import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {

    const { user, setShowLogin, logout, credit } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className='flex items-center justify-between py-4'>
            <Link to="/">
                <img src={assets.logo} alt='logo' className='w-28 sm-w-32 lg:w-40' />
            </Link>

            <div>
                {
                    user ?
                        <div className='flex items-center gap-2 sm:gap-3'>
                            <button onClick={() => navigate('/buy-credit')} className='flex items-center gap-2 sm:gap-3 bg-blue-100 px-4 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700 cursor-pointer'>
                                <img src={assets.credit_star} alt='credit_star' className='w-5' />
                                <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits left: {credit}</p>
                            </button>
                            <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>
                            <div className="relative group">
                                <img
                                    src={assets.profile_icon}
                                    alt="user"
                                    className="w-10 sm:w-12 cursor-pointer"
                                />
                                <div className="absolute hidden group-hover:block group-focus-within:block top-full right-0 z-10 text-black rounded-md pt-2">
                                    <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm min-w-[150px] shadow-lg">
                                        <li onClick={logout} className="py-2 px-4 cursor-pointer hover:bg-gray-100">
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        :
                        <div className='flex items-center gap-2 sm:gap-5'>
                            <p className='cursor-pointer'>
                                Pricing
                            </p>
                            <button
                                onClick={() => setShowLogin(true)}
                                className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full cursor-pointer'>
                                Login
                            </button>
                        </div>
                }
            </div>
        </div>
    )
}

export default Navbar
