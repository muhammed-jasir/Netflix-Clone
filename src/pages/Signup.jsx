import React from 'react'
import logo from '../assets/icons/logo.png'
import banner from '../assets/background_banner.jpg'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Signup = () => {
    return (
        <>
            <Header />
            <div
                className="flex flex-col items-center justify-center gap-7 min-h-screen bg-no-repeat bg-cover bg-center py-8 px-3 sm:px-5 bg-gradient-to-r from-[#0000007e] to-[#0000007e]"
                style={{ backgroundImage: `url(${banner})` }}
            >
                <img
                    src={logo}
                    alt='logo'
                    className='w-[150px]' />

                <div className='flex flex-col items-center gap-12 max-w-[460px] w-full bg-black/75 rounded-md px-8 sm:px-12 py-12'>
                    <form className='flex flex-col items-center w-full gap-7'>
                        <h1 className='text-3xl font-bold'>
                            Sign Up
                        </h1>

                        <input
                            type='text'
                            placeholder='Name'
                            id='name'
                            className='w-full h-12 rounded bg-[#333] text-white border-0 outline-0 font-semibold text-base px-5 py-4' />

                        <input
                            type='text'
                            placeholder='Email'
                            id='email'
                            className='w-full h-12 rounded bg-[#333] text-white border-0 outline-none font-semibold text-base px-5 py-4' />

                        <input
                            type='password'
                            placeholder='Password'
                            id='password'
                            className='w-full h-12 rounded bg-[#333] text-white border-0 outline-none font-semibold text-base px-5 py-4' />

                        <div className='w-full flex flex-col gap-2'>
                            <button className='w-full bg-[#e50914] hover:bg-[#e50914cb] text-white p-3 text-base font-semibold rounded '>
                                Sign Up
                            </button>
                            <div className='w-full flex justify-between items-center text-[#b3b3b3] text-sm font-medium'>
                                <div className='flex items-center gap-1'>
                                    <input type='checkbox' id='remember' className='cursor-pointer h-4' />
                                    <label htmlFor='remember'>Remember me</label>
                                </div>
                                <p className='hover:underline hover:underline-offset-2 cursor-pointer'>
                                    Need Help?
                                </p>
                            </div>
                        </div>
                    </form>
                    <div className='w-full flex items-center gap-1.5 text-[#b3b3b3] font-medium'>
                        Already have an Account?
                        <Link to='/signin'>
                            <span className='text-[#fff] font-semibold hover:underline hover:underline-offset-2 cursor-pointer'>
                                Sign in Now
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Signup