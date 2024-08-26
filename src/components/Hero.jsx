import React from 'react'

import hero_img from '../assets/moneyheist-banner.jpg'
import play_icon from '../assets/icons/play_icon.png'
import info_icon from '../assets/icons/info_icon.png'
import MovieCards from './MovieCards'

const Hero = () => {
    return (
        <section className='relative w-full overflow-hidden'>
            <img
                src={hero_img}
                alt='hero_img'
                className='w-full h-[800px] object-cover'
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75"></div>

            <div className='absolute w-full flex flex-col p-4 items-center md:items-start text-center md:text-left md:max-w-2xl md:pl-20 bottom-72 gap-7'>
                <h1 className='text-5xl font-bold'>
                    Money Heist
                </h1>
                <p className='text-lg font-semibold'>
                    When the national mint and a touring school group are held hostage by robbers, police believe that the thieves have no way out. Little do they know that the thieves have a bigger plan in store
                </p>
                <div className='flex gap-3'>
                    <button className='flex items-center px-8 py-2 gap-2 text-lg font-semibold cursor-pointer bg-white text-black rounded hover:bg-[#ffffffbf]'>
                        <img
                            src={play_icon}
                            alt='play_icon'
                            className='w-6'
                        />
                        Play
                    </button>
                    <button className='flex items-center px-6 py-2 gap-2 text-lg font-semibold cursor-pointer  bg-[#6d6d6eb3] text-white rounded hover:bg-[#6d6d6e66]'>
                        <img
                            src={info_icon}
                            alt='info_icon'
                            className='w-6'
                        />
                        More Info
                    </button>
                </div>
            </div>

            <div className='absolute bottom-8 max-w-full px-4 sm:px-6 md:px-8'>
                <MovieCards title='Trending on Netflix' />
            </div>
        </section>
    )
}

export default Hero