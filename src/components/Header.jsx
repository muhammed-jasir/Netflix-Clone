import React, { useEffect, useRef, useState } from 'react'

import logo from '../assets/icons/logo.png'
import search_icon from '../assets/icons/search.png'
import bell_icon from '../assets/icons/bell.png'
import profile_icon from '../assets/icons/profile_icon.png'
import caret_icon from '../assets/icons/caret_icon.svg'
import menu_icon from '../assets/icons/menu.png'

import { Link } from 'react-router-dom'

const Header = () => {
    const [navbarToggle, setNavbarToggle] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const headerRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setIsScrolled(false);
            } else {
                setIsScrolled(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return (
            () => {
                window.removeEventListener('scroll', handleScroll);
            }
        );

    }, [])

    return (
        <header
            className={`fixed w-full flex gap-10 justify-between items-center px-5 py-5 z-10 
                ${navbarToggle ? 'mb-[258px]' : 'mb-0'} md:mb-0 
                ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/70 via-black/70 to-transparent'}`}
            ref={headerRef}
        >
            <div className='flex items-center gap-14'>
                <Link to='/'>
                    <img
                        src={logo}
                        alt='logo'
                        className='w-24'
                    />
                </Link>
                <nav className={`absolute top-16 left-0 md:static w-full md:w-auto bg-[#0e1111] md:bg-transparent transition-all duration-300 ease-in-out ${navbarToggle ? 'block' : 'hidden'} md:flex`}>
                    <ul className='flex flex-col md:flex-row gap-1 md:gap-5 md:items-center text-lg font-semibold py-4 md:py-0'>
                        <Link to='/'>
                            <li className='cursor-pointer px-8 md:px-0 py-2 md:py-0 hover:bg-black md:hover:bg-transparent md:hover:text-gray-400 '>
                                Home
                            </li>
                        </Link>
                        <li className='cursor-pointer px-8 md:px-0 py-2 md:py-0 hover:bg-black md:hover:bg-transparent md:hover:text-gray-400'>
                            Movies
                        </li>
                        <li className='cursor-pointer px-8 md:px-0 py-2 md:py-0 hover:bg-black md:hover:bg-transparent md:hover:text-gray-400 line-clamp-1'>
                            TV Shows
                        </li>
                        <li className='cursor-pointer px-8 md:px-0 py-2 md:py-0 hover:bg-black md:hover:bg-transparent md:hover:text-gray-400 line-clamp-1'>
                            My List
                        </li>
                        <li className='cursor-pointer px-8 md:px-0 py-2 md:py-0 hover:bg-black md:hover:bg-transparent md:hover:text-gray-400 line-clamp-1'>
                            Recently Added
                        </li>
                    </ul>
                </nav>
            </div>

            <div className='flex gap-5 items-center'>
                <button>
                    <img
                        src={search_icon}
                        alt='search'
                        className='cursor-pointer w-7'
                    />
                </button>
                <button>
                    <img
                        src={bell_icon}
                        alt='bell'
                        className='cursor-pointer w-7'
                    />
                </button>
                <div className='relative flex gap-2.5 items-center'>
                    <img
                        src={profile_icon}
                        alt='profile'
                        className='cursor-pointer w-7 rounded'
                        onClick={() => setDropdown(!dropdown)}
                    />
                    <img
                        src={caret_icon}
                        alt='caret'
                        className='cursor-pointer w-4 hidden sm:block'
                        onClick={() => setDropdown(!dropdown)}
                    />
                    {dropdown && (
                        <div className='absolute top-11 right-0 w-max bg-[#191919] px-4 py-2 rounded z-10 hover:underline hover:underline-offset-4 text-[15px]'>
                            <p className='cursor-pointer'>Sign Out</p>
                        </div>
                    )}
                </div>
                <button onClick={() => setNavbarToggle(!navbarToggle)}>
                    <img
                        src={menu_icon}
                        alt=''
                        className='block md:hidden w-7'
                    />
                </button>
            </div>
        </header>
    )
}

export default Header