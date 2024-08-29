import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axios';
import { useParams } from 'react-router-dom';

const Player = () => {
    const [video, setVideo] = useState([]);
    const [details, setDetails] = useState([]);

    const { id, type } = useParams();

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axiosInstance.get(`${type}/${id}/videos`);
                const trailerVideos = response.data.results.filter((video) => video.type === 'Trailer');
                setVideo(trailerVideos[0]);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        }

        const fetchDetails = async () => {
            try {
                const response = await axiosInstance.get(`${type}/${id}`);
                setDetails(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        }

        fetchVideo();
        fetchDetails();
    }, [type, id]);

    return (
        <div className="pt-20 pb-10 flex flex-col items-center justify-center w-full px-4 sm:px-8">
            <div className='relative w-full'>

            </div>

            <div className="w-full max-w-[1200px] h-auto py-4">
                <iframe
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.type}
                    frameBorder='0'
                    allowFullScreen
                    className='w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[550px] rounded-xl shadow-md bg-[#191919]'
                />
                <div className='flex justify-between items-center w-full py-2 mt-4 border-t border-gray-700'>
                    <p className='text-sm sm:text-base text-gray-400'>
                        {new Date(video.published_at).toLocaleDateString()}
                    </p>
                    <p className='text-sm sm:text-base text-gray-400'>
                        {video.type}
                    </p>
                </div>
            </div>
            <div className="w-full max-w-[1200px] bg-[#1a1a1a] p-6 rounded-md shadow-md px-4 sm:px-8">
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2'>
                    {details.title || details.name}
                </h1>
                <div className='flex flex-col gap-4'>
                    <p className="text-lg sm:text-lg font-medium text-gray-400 italic">
                        {details.tagline}
                    </p>
                    <p className='text-[16px] sm:text-lg md:text-xl font-semibold text-gray-300 mb-4 leading-relaxed'>
                        {details.overview}
                    </p>
                </div>
                <p className="text-base sm:text-lg font-medium text-gray-200 mb-4">
                    <strong>Genres:</strong> {details.genres?.map(genre => genre.name).join(', ')}
                </p>
                <div className='flex flex-col gap-4 text-sm sm:text-base mb-4'>
                    <div className='flex gap-3 text-gray-400'>
                        <p>
                            <strong>Status</strong> {details.status}
                        </p>
                        <p>
                            <strong>Release Date:</strong> {details.release_date}
                        </p>
                    </div>
                    <div className='flex gap-3 text-gray-300'>
                        <p>
                            <strong>Rating:</strong> {details.vote_average} /10
                        </p>
                        <p>
                            <strong>Runtime:</strong> {details.runtime} minutes
                        </p>
                    </div>
                </div>
                <div className='flex gap-4 text-sm sm:text-base text-gray-400'>
                    <p >
                        <strong>Budget:</strong> ${details.budget?.toLocaleString()}
                    </p>
                    <p className="">
                        <strong>Revenue:</strong> ${details.revenue?.toLocaleString()}
                    </p>
                </div>
            </div>
        </div >
    );
};

export default Player;


