import React, { useEffect, useState } from 'react'

import axiosInstance from '../services/axios'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

import play_icon from '../assets/icons/play_icon.png'
import info_icon from '../assets/icons/info_icon.png'

const Hero = () => {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        const path = window.location.pathname;

        const fetchTrendingAll = async () => {
            try {
                const response = await axiosInstance.get("trending/all/day");
                const filtered = response.data.results.filter(item => item.media_type !== 'people');
                const index = Math.floor(Math.random() * filtered.length);
                setApiData(filtered[index]);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        }

        const fetchTrendingMovies = async () => {
            try {
                const response = await axiosInstance.get("trending/movie/day");
                const index = Math.floor(Math.random() * response.data.results.length);
                setApiData(response.data.results[index]);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        const fetchTrendingTvShows = async () => {
            try {
                const response = await axiosInstance.get("trending/tv/day");
                const index = Math.floor(Math.random() * response.data.results.length);
                setApiData(response.data.results[index]);
            } catch (error) {
                console.error("Error fetching tv shows:", error);
            }
        }

        if (path.includes('/movies')) {
            fetchTrendingMovies();
        } else if (path.includes('/tv')) {
            fetchTrendingTvShows();
        } else {
            fetchTrendingAll();
        }
    }, [])

    return (
        <section className='relative w-full overflow-hidden'>
            <img
                src={apiData && IMAGE_BASE_URL + apiData.backdrop_path}
                alt=''
                className='w-full h-[800px] object-cover bg-[#191919]'
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-75"></div>

            <div className='absolute w-full flex flex-col p-4 items-center md:items-start text-center md:text-left md:max-w-2xl md:pl-20 bottom-52 gap-7'>
                <h1 className='text-5xl font-bold'>
                    {apiData && apiData.media_type === 'movie' ? apiData.title : apiData.name}
                </h1>
                <p className='text-lg font-semibold'>
                    {apiData && apiData.overview}
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
        </section>
    )
}

export default Hero