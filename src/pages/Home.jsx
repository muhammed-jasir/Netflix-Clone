import React from 'react';
import Hero from '../components/Hero';
import MovieCards from '../components/MovieCards';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { trendingAll, popularMovies, upcomingMovies, nowPlayingMovies, topRatedMovies, popularTvShows, upcomingTvShows, nowPlayingTvShows, topRatedTvShows } from '../constants/urls'
const Home = () => {
    return (
        <div className=''>
            <Header />
            <Hero />
            <div className='flex gap-5 flex-col px-4 sm:px-6 md:px-8 py-8'>
                <MovieCards title='Trending on Netflix' url={trendingAll} />
                <MovieCards title='Popular Movies' url={popularMovies} />
                <MovieCards title='Now Playing Movies' url={nowPlayingMovies} />
                <MovieCards title='Top Rated Movies' url={topRatedMovies} />
                <MovieCards title='Upcoming Movies' url={upcomingMovies} />
                <MovieCards title='Popular TV Shows' url={popularTvShows} />
                <MovieCards title='Now Playing TV Shows' url={nowPlayingTvShows} />
                <MovieCards title='Top Rated TV Shows' url={topRatedTvShows} />
                <MovieCards title='Upcoming TV Shows' url={upcomingTvShows} />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
