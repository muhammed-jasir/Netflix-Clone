import React, { useState } from 'react'
import logo from '../assets/icons/logo.png'
import banner from '../assets/background_banner.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useUserAuthContext } from '../context/UserAuthContext'
import Spinner from './Spinner'

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const { signup } = useUserAuthContext();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name) {
            return toast.error('Name is required')
        }

        if (!formData.email) {
            return toast.error("Email is required");
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            return toast.error("Email is invalid");
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

        if (!formData.password) {
            return toast.error("Password is required");
        } else if (!passwordPattern.test(formData.password)) {
            return toast.error("Password must contain at least one uppercase letter, one lowercase letter, and one digit");
        }

        setLoading(true);
        try {
            await signup(formData.name, formData.email, formData.password);
            toast.success("Signup successful!");
            navigate('/signin');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="flex flex-col items-center justify-center bg-[#191919] gap-7 min-h-screen bg-no-repeat bg-cover bg-center py-8 px-3 sm:px-5 bg-gradient-to-r from-[#0000007e] to-[#0000007e]"
            style={{ backgroundImage: `url(${banner})` }}
        >
            <img
                src={logo}
                alt='logo'
                className='w-[150px]' 
            />

            <div className='flex flex-col items-center gap-12 max-w-[460px] w-full bg-black/75 rounded-md px-8 sm:px-12 py-12'>
                <form
                    className='flex flex-col items-center w-full gap-7'
                    onSubmit={handleSubmit}
                >
                    <h1 className='text-3xl font-bold'>
                        Sign Up
                    </h1>

                    <input
                        type='text'
                        placeholder='Name'
                        id='name'
                        className='w-full h-12 rounded bg-[#333] text-white border-0 outline-0 font-semibold text-base px-5 py-4'
                        onChange={handleChange}
                        value={formData.name}
                    />

                    <input
                        type='text'
                        placeholder='Email'
                        id='email'
                        className='w-full h-12 rounded bg-[#333] text-white border-0 outline-none font-semibold text-base px-5 py-4'
                        onChange={handleChange}
                        value={formData.email}
                    />

                    <input
                        type='password'
                        placeholder='Password'
                        id='password'
                        className='w-full h-12 rounded bg-[#333] text-white border-0 outline-none font-semibold text-base px-5 py-4'
                        onChange={handleChange}
                        value={formData.password}
                    />

                    <div className='w-full flex flex-col gap-2'>
                        <button className='w-full bg-[#e50914] hover:bg-[#e50914cb] text-white p-3 text-base font-semibold rounded '>
                            {loading
                                ? (
                                    <div className='flex items-center justify-center gap-3'>
                                        <Spinner borderColor={'border-slate-500'} />
                                        <span>Loading ...</span>
                                    </div>
                                )
                                : (
                                    <span className='text-lg'>
                                        Sign Up
                                    </span>
                                )
                            }
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
                            Sign In
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup