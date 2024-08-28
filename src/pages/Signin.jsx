import React from 'react'
import logo from '../assets/icons/logo.png'
import banner from '../assets/background_banner.jpg'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Signin = () => {
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
                            Sign In
                        </h1>

                        <input
                            type='text'
                            placeholder='Email'
                            id='email'
                            className='w-full h-12 rounded bg-[#333] text-white border-0 outline-none font-semibold text-base px-5 py-4' />

                        <div className='w-full flex flex-col gap-1'>
                            <input
                                type='password'
                                placeholder='Password'
                                id='password'
                                className='w-full h-12 rounded bg-[#333] text-white border-0 outline-none font-semibold text-base px-5 py-4' />
                            <p className='text-sm text-[#b3b3b3] text-right hover:underline hover:underline-offset-2'>
                                Forgot your Password?
                            </p>
                        </div>

                        <div className='w-full flex flex-col gap-2'>
                            <button className='w-full bg-[#e50914] hover:bg-[#e50914cb] text-white p-3 text-base font-semibold rounded '>
                                Sign In
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
                        New to Netflix?
                        <Link to='/signup'>
                            <span className='text-[#fff] font-semibold hover:underline hover:underline-offset-2 cursor-pointer'>
                                Sign Up Now
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Signin