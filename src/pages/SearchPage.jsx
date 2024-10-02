import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axios';
import Spinner from '../components/Spinner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [medias, setMedias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

    const fetchData = async () => {
        if (page > 1) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }

        try {
            const response = await axiosInstance.get('/search/multi', {
                params: {
                    query: searchQuery,
                    page: page,
                }
            });

            const results = response.data.results.filter((result) => result.media_type !== 'person');
            setMedias((prev) => [...prev, ...results]);

            setTotalPages(response.data.total_pages);
        } catch (error) {
            console.error("Error fetching:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        if (searchQuery.trim().length > 0) {
            fetchData();
        } else {
            setMedias([]);
            setPage(1);
            setTotalPages(0);
        }

    }, [searchQuery, page]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        setPage(1);
        setMedias([]);
    };

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    return (
        <>
            <Header />

            <section className='container mx-auto min-h-[800px] md:min-h-screen flex flex-col items-center pt-20 pb-4 w-full'>
                <form className='flex justify-center items-center pt-5 px-2.5 sm:px-5 w-full'>
                    <input
                        type='text'
                        placeholder='Search'
                        className='max-w-xl w-full h-12 px-5 py-3 rounded-md bg-[#191919] text-[#ffffff] text-lg outline-none shadow-md'
                        onChange={handleSearch}
                        value={searchQuery}
                    />
                </form>

                <div className='flex flex-col justify-center items-center'>
                    {
                        loading ? (
                            <div className='w-full h-[500px] flex items-center justify-center'>
                                <Spinner borderColor={'border-red-800'} />
                            </div>
                        ) : (
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-2.5 md:gap-x-5 gap-y-3 md:gap-y-5 pt-5 pb-5 w-full px-1.5 md:px-4'>
                                {
                                    medias.map((data, index) => (
                                        <div
                                            key={index}
                                            className='min-w-[150px] max-w-[150px] sm:min-w-[200px] sm:max-w-[200px] md:min-w-[230px] md:max-w-[230px]'
                                        >
                                            <Link to={`/player/${data.media_type}/${data.id}`}>
                                                <img
                                                    src={data && IMAGE_BASE_URL + data.poster_path}
                                                    alt={data.title || data.name || 'Poster'}
                                                    className='cursor-pointer h-[200px] sm:h-[250px] md:h-[300px] w-full rounded object-cover bg-[#191919]'
                                                />
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }

                    {
                        page < totalPages && (
                            <button
                                onClick={handleLoadMore}
                                className={`mt-5 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center ${loadingMore ? 'cursor-not-allowed' : ''}`}
                                disabled={loadingMore}
                            >
                                {loadingMore ? (
                                    <div className="flex items-center">
                                        <Spinner borderColor={'border-white'} />
                                        <span className="ml-2">Loading...</span>
                                    </div>
                                ) : (
                                    'Load More'
                                )}
                            </button>
                        )
                    }
                </div>
            </section >
            <Footer />
        </>
    )
}

export default SearchPage;
