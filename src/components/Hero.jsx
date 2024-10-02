import React, { useEffect, useState } from 'react'

import axiosInstance from '../services/axios'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

import play_icon from '../assets/icons/play_icon.png'
import info_icon from '../assets/icons/info_icon.png'
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

const Hero = () => {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const path = window.location.pathname;

        const fetchTrendingAll = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get("trending/all/day");
                const filtered = response.data.results.filter(item => item.media_type !== 'people');
                const index = Math.floor(Math.random() * filtered.length);
                setApiData(filtered[index]);
            } catch (error) {
                console.error("Error fetching:", error);
            } finally {
                setLoading(false);
            }
        }

        const fetchTrendingMovies = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get("trending/movie/day");
                const index = Math.floor(Math.random() * response.data.results.length);
                setApiData(response.data.results[index]);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        }

        const fetchTrendingTvShows = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get("trending/tv/day");
                const index = Math.floor(Math.random() * response.data.results.length);
                setApiData(response.data.results[index]);
            } catch (error) {
                console.error("Error fetching tv shows:", error);
            } finally {
                setLoading(false);
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

    if (loading) {
        return (
            <div className='w-full h-[780px] md:h-[800px] lg:h-[850px] flex items-center justify-center'>
                <Spinner borderColor={'border-red-800'}/>
            </div>
        )
    }

    return (
        <section className='relative w-full overflow-hidden'>
            <img
                src={apiData && IMAGE_BASE_URL + apiData.backdrop_path}
                alt=''
                className='w-full h-[780px] md:h-[800px] lg:h-[850px] object-cover bg-[#191919]'
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-75"></div>

            <div className='absolute w-full flex flex-col p-4 items-center md:items-start text-center md:text-left md:max-w-2xl md:pl-20 bottom-52 gap-7'>
                <h1 className='text-5xl font-bold'>
                    {apiData && apiData.media_type === 'movie' ? apiData.title : apiData.name}
                </h1>
                <p className='text-lg font-semibold text-ellipsis line-clamp-3'>
                    {apiData && apiData.overview}
                </p>
                <div className='flex gap-3'>
                    <Link to={`/player/${apiData.media_type}/${apiData.id}`}>
                        <button className='flex items-center px-4 sm:px-8 py-2 gap-2 text-lg font-semibold cursor-pointer bg-white text-black rounded hover:bg-[#ffffffbf]'>
                            <img
                                src={play_icon}
                                alt='play_icon'
                                className='w-6'
                            />
                            Play
                        </button>
                    </Link>
                    <Link to={`/player/${apiData.media_type}/${apiData.id}`}>
                        <button className='flex items-center px-4 sm:px-6 py-2 gap-1 sm:gap-2 text-lg font-semibold cursor-pointer bg-[#6d6d6eb3] text-white rounded hover:bg-[#6d6d6e66] whitespace-nowrap'>
                            <img
                                src={info_icon}
                                alt='info_icon'
                                className='w-6'
                            />
                            More Info
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Hero