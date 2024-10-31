import React, { useEffect, useState } from 'react'
import { useWatchlistContext } from '../context/WatchlistContext';
import { useUserAuthContext } from '../context/UserAuthContext';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const Mylist = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

    const { fetchWatchlist } = useWatchlistContext();
    const { user } = useUserAuthContext();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchWatchlist(user.uid);
                setWatchlist(response);
            } catch (error) {
                console.error("Failed to fetch watchlist:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    if (loading) {
        return (
            <div className='w-full min-h-screen flex items-center justify-center'>
                <Spinner borderColor={'border-red-600'} />
            </div>
        );
    }

    if (!loading && watchlist.length === 0) {
        return (
            <div className='w-full min-h-screen flex items-center justify-center'>
                <h2 className='text-xl'>Your watchlist is empty.</h2>
            </div>
        );
    }

    return (
        <section className='container mx-auto min-h-[800px] md:min-h-screen flex flex-col items-center pt-20'>
            <h1 className='text-3xl font-bold py-3'>My List</h1>
            <div className='flex'>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-2.5 md:gap-x-5 gap-y-3 md:gap-y-5 pt-5 pb-5 w-full px-1.5 md:px-4'>
                    {
                        watchlist.map((item, index) => (
                            <div
                                key={index}
                                className='min-w-[150px] max-w-[150px] sm:min-w-[200px] sm:max-w-[200px] md:min-w-[230px] md:max-w-[230px]'
                            >
                                <Link to={`/player/${item.type}/${item.id}`}>
                                    <img
                                        src={item && IMAGE_BASE_URL + item.poster_path}
                                        alt={item.title || item.name || 'Poster'}
                                        className='cursor-pointer h-[200px] sm:h-[250px] md:h-[300px] w-full rounded object-cover bg-[#191919]'
                                    />
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Mylist