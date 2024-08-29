import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axios';
import { Link } from 'react-router-dom';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieCards = ({ title, url, movieGenreId, tvGenreId, isTvShow }) => {
    const [apiData, setApiData] = useState([]);

    const getRandomPage = () => Math.floor(Math.random() * 300) + 1;
    const getRandPage = () => Math.floor(Math.random() * 5) + 1;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axiosInstance.get(url, {
                    params: {
                        page: getRandPage(),
                    },
                });
                setApiData(response.data.results);
            } catch (error) {
                console.error('Error fetching Movies:' + error)
            }
        }

        const fetchMoviesById = async (movieGenreId) => {
            try {
                const response = await axiosInstance.get('/discover/movie', {
                    params: {
                        with_genres: movieGenreId,
                        sort_by: 'popularity.desc',
                        page: getRandomPage(),
                    },
                })

                setApiData(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }

        const fetchTvShowsById = async (tvGenreId) => {
            try {
                const response = await axiosInstance.get('/discover/tv', {
                    params: {
                        with_genres: tvGenreId,
                        sort_by: 'popularity.desc',
                        page: getRandomPage(),
                    },
                })

                setApiData(response.data.results);
            } catch (error) {
                console.error('Error fetching tv shows:', error);
            }
        }

        if (movieGenreId) {
            fetchMoviesById();
        } else if (url) {
            fetchMovies();
        } else if (tvGenreId) {
            fetchTvShowsById();
        }
    }, [url, movieGenreId, tvGenreId])

    return (
        <div className='flex flex-col gap-4 w-full'>
            <h2 className='text-2xl font-semibold'>
                {title && title}
            </h2>
            <div className='w-full px-4 sm:px-6'>
                <div
                    className='flex gap-5 items-center overflow-x-auto scrollbar-hide'
                >
                    {apiData.length > 0 && apiData.map((api, index) => (
                        <div
                            key={index}
                            className='min-w-[200px] md:min-w-[250px] lg:min-w-[150px]'
                        >
                            <Link to={`/player/${isTvShow ? 'tv' : 'movie'}/${api.id}`}>
                                <img
                                    src={api && IMAGE_BASE_URL + api.poster_path}
                                    alt={api.title || api.name || 'Poster'}
                                    className='cursor-pointer h-auto w-full rounded object-cover bg-[#191919]'
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default MovieCards