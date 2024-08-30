import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axios';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';

const Player = () => {
    const [video, setVideo] = useState(null);
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    const { id, type } = useParams();

    useEffect(() => {
        const fetchVideo = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`${type}/${id}/videos`);
                const trailerVideos = response.data.results.filter((video) => video.type === 'Trailer');
                const index = Math.floor(Math.random() * trailerVideos.length);
                setVideo(trailerVideos[index]);
            } catch (error) {
                console.error('Error fetching videos:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchDetails = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`${type}/${id}`);
                setDetails(response.data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
        fetchDetails();
    }, [type, id]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="pt-20 pb-10 flex flex-col items-center justify-center w-full px-4 sm:px-8">
            <div className="w-full max-w-[1200px] h-auto py-4">
                <div className='relative w-full pb-[56%] h-0'>
                    <iframe
                        src={video ? `https://www.youtube.com/embed/${video.key}` : ''}
                        title={video && video.type}
                        frameBorder='0'
                        allowFullScreen
                        className='absolute top-0 left-0 w-full h-full rounded-xl shadow-md bg-[#191919]'
                    />
                </div>
                <div className='flex justify-between items-center w-full py-2 mt-4 border-t border-gray-700'>
                    <p className='text-sm sm:text-base text-gray-400'>
                        {video && new Date(video.published_at).toLocaleDateString()}
                    </p>
                    <p className='text-sm sm:text-base text-gray-400'>
                        {video && video.type}
                    </p>
                </div>
            </div>
            <div className="w-full max-w-[1200px] bg-[#1a1a1a] p-6 rounded-md shadow-md px-4 sm:px-8">
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2'>
                    {details ? details.title || details.name : ''}
                </h1>

                <div className='flex flex-col gap-4'>
                    <p className="text-lg sm:text-lg font-medium text-gray-400 italic">
                        {details && details.tagline}
                    </p>
                    <p className='text-[16px] sm:text-lg md:text-xl font-semibold text-gray-300 mb-4 leading-relaxed'>
                        {details && details.overview}
                    </p>
                </div>

                <div className='flex flex-col gap-4 text-sm sm:text-base mb-4'>
                    <p className="text-base sm:text-lg font-medium text-gray-300">
                        <strong>Genres:</strong> {details && details.genres.map(genre => genre.name).join(', ')}
                    </p>
                    <p>
                        <strong>Status</strong> {details && details.status}
                    </p>
                    <p>
                        <strong>Release Date:</strong> {details && details.release_date}
                    </p>
                    <p>
                        <strong>Rating:</strong> {details && details.vote_average} /10
                    </p>
                    <p>
                        <strong>Runtime:</strong> {details && details.runtime} minutes
                    </p>
                </div>
                
                <div className='flex flex-col gap-4 text-sm sm:text-base text-gray-300'>
                    <p>
                        <strong>Budget:</strong> ${details && details.budget?.toLocaleString()}
                    </p>
                    <p>
                        <strong>Revenue:</strong> ${details && details.revenue?.toLocaleString()}
                    </p>
                </div>
            </div>
        </div >
    );
};

export default Player;


