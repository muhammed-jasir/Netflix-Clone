import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axios';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import { useWatchlistContext } from '../context/WatchlistContext';
import { useUserAuthContext } from '../context/UserAuthContext';
import heart_colored from '../assets/icons/heart_colored.png'
import heart_icon from '../assets/icons/heart.png'
import { toast } from 'react-toastify';

const MovieCards = ({ title, url, movieGenreId, tvGenreId, isTvShow }) => {
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingList, setLoadingList] = useState(false);
    const [watchlistStatus, setWatchlistStatus] = useState({});
    
    const { user } = useUserAuthContext();
    const { fetchWatchlist, removeFromWatchlist, addToWatchlist } = useWatchlistContext();

    const getRandomPage = () => {
        return Math.floor(Math.random() * 200) + 1;
    }

    const getRandPage = () => {
        return Math.floor(Math.random() * 5) + 1;
    }

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(url, {
                    params: {
                        page: getRandPage(),
                    },
                });
                setApiData(response.data.results);
            } catch (error) {
                console.error('Error fetching Movies:' + error)
            } finally {
                setLoading(false);
            }
        }

        const fetchMoviesById = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/discover/movie', {
                    params: {
                        with_genres: movieGenreId,
                        sort_by: 'popularity.desc',
                        page: getRandomPage(),
                    },
                });
                setApiData(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        }

        const fetchTvShowsById = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/discover/tv', {
                    params: {
                        with_genres: tvGenreId,
                        sort_by: 'popularity.desc',
                        page: getRandomPage(),
                    },
                });

                setApiData(response.data.results);
            } catch (error) {
                console.error('Error fetching tv shows:', error);
            } finally {
                setLoading(false);
            }
        }

        if (movieGenreId) {
            fetchMoviesById();
        } else if (url) {
            fetchMovies();
        } else if (tvGenreId) {
            fetchTvShowsById();
        }
    }, [url, movieGenreId, tvGenreId]);

    useEffect(() => {
        const checkWatchlistStatus = async () => {
            const watchlist = await fetchWatchlist(user.uid);
            const watchlistMap = {};
            watchlist.forEach(item => {
                watchlistMap[item.id] = true; 
            });

            const updatedStatus = apiData.reduce((acc, api) => {
                acc[api.id] = watchlistMap[api.id] || false; 
                return acc;
            }, {});

            setWatchlistStatus(updatedStatus);
        };

        if (user && apiData.length > 0) {
            checkWatchlistStatus();
        }
    }, [user, apiData]);

    const handleClick = async (item) => {
        setLoadingList(true);
        try {
            if (!user) {
                toast.error('you need to login');
            } else {
                if (!watchlistStatus[item.id]) { 
                    await addToWatchlist(user.uid, item, isTvShow ? 'tv' : 'movie');
                    setWatchlistStatus((prevStatus) => ({ ...prevStatus, [item.id]: true })); 
                    toast.success('Added to watchlist');
                } else {
                    await removeFromWatchlist(user.uid, item, isTvShow ? 'tv' : 'movie');
                    setWatchlistStatus((prevStatus) => ({ ...prevStatus, [item.id]: false })); 
                    toast.success('Removed from watchlist');
                }
            }
        } catch (error) {
            console.log('Error updating from watchlist:', error);
        } finally {
            setLoadingList(false)
        }
    }

    return (
        <div className='flex flex-col gap-4 w-full'>
            <h2 className='text-2xl font-semibold'>
                {title && title}
            </h2>
            <div className='w-full px-4 sm:px-6'>
                {loading ? (
                    <div className="flex justify-center items-center w-full h-[200px]">
                        <Spinner borderColor={'border-red-800'} />
                    </div>
                ) : (
                    <div
                        className='flex gap-5 items-center overflow-x-auto scrollbar-hide'
                    >
                        {apiData.length > 0 && apiData.map((api, index) => (
                            <div
                                key={index}
                                className='min-w-[200px] md:min-w-[250px] lg:min-w-[150px] relative'
                            >
                                <Link to={`/player/${isTvShow ? 'tv' : 'movie'}/${api.id}`}>
                                    <img
                                        src={api && IMAGE_BASE_URL + api.poster_path}
                                        alt={api.title || api.name || 'Poster'}
                                        className='cursor-pointer h-auto w-full rounded object-cover bg-[#191919]'
                                    />
                                </Link>

                                <button className='absolute top-2.5 right-2.5 p-1.5 rounded-xl bg-red-600 cursor-pointer' onClick={() => handleClick(api)}>
                                    {watchlistStatus[api.id] ? (
                                        <img src={heart_colored} alt='In Watchlist' className='cursor-pointer w-6' />
                                    ) : (
                                        <img src={heart_icon} alt='Add to Watchlist' className='cursor-pointer w-6' />
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    )
}

export default MovieCards

