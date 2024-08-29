import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import MovieCards from '../components/MovieCards';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { TvShowGenres } from "../constants/GenreList";


const TvShows = () => {
    return (
        <div className="">
            <Header />
            <Hero />

            <div className='flex gap-5 flex-col px-4 sm:px-6 md:px-8 py-8'>
                {TvShowGenres.map(
                    (genre, index) => (
                        <div key={index}>
                            <MovieCards tvGenreId={genre.id} title={genre.name} />
                        </div>
                    )
                )}
            </div>

            <Footer />
        </div>
    );
};

export default TvShows;
