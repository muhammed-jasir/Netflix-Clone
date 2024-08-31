import React, { useState } from 'react'
import logo from '../assets/icons/logo.png'
import banner from '../assets/background_banner.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useUserAuthContext } from '../context/UserAuthContext'
import Spinner from './Spinner'

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: '',
    });
    const [loading, setLoading] = useState(false);

    const { resetPassword } = useUserAuthContext();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email) {
            return toast.error("Email is required");
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            return toast.error("Email is invalid");
        }

        setLoading(true);
        
        try {
            await resetPassword(formData.email);
            toast.success("Password reset email sent successfully!");
            toast.success("Please check your email");
            navigate('/signin');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div
            className="pt-20 flex flex-col items-center justify-center bg-[#191919] gap-7 min-h-screen bg-no-repeat bg-cover bg-center py-8 px-3 sm:px-5 bg-gradient-to-r from-[#0000007e] to-[#0000007e]"
            style={{ backgroundImage: `url(${banner})` }}
        >
            <img
                src={logo}
                alt='logo'
                className='w-[150px]'
            />

            <div className='flex flex-col items-center gap-8 max-w-[460px] w-full bg-black/75 rounded-md px-8 sm:px-12 py-12'>
                <form
                    className='flex flex-col items-center w-full gap-7'
                    onSubmit={handleSubmit}
                >
                    <h1 className='text-3xl font-bold'>
                        Forgot Password
                    </h1>

                    <input
                        type='text'
                        placeholder='Email'
                        id='email'
                        className='w-full h-12 rounded bg-[#333] text-white border-0 outline-none font-semibold text-base px-5 py-4'
                        onChange={handleChange}
                        value={formData.email}
                    />

                    <div className='w-full flex flex-col gap-2'>
                        <button
                            disabled={loading}
                            className='w-full bg-[#e50914] hover:bg-[#e50914cb] text-white p-3 text-base font-semibold rounded'
                        >
                            {loading
                                ? (
                                    <div className='flex items-center justify-center gap-3'>
                                        <Spinner borderColor={'border-slate-500'} />
                                        <span>Loading ...</span>
                                    </div>
                                )
                                : (
                                    <span className='text-lg'>
                                        Reset Password
                                    </span>
                                )
                            }
                        </button>
                    </div>
                </form>
                <div className='w-full flex items-center justify-center gap-1.5 text-[#fff] text-lg font-semibold hover:underline hover:underline-offset-2 cursor-pointer'>
                    <Link to='/signin'>
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword