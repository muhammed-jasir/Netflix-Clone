import React from 'react'
import Hero from '../components/Hero'
import MovieCards from '../components/MovieCards'

const Home = () => {
  return (
    <div className=''>
        <Hero />
        <div className='flex gap-5 flex-col px-4 sm:px-6 md:px-8 py-8'>
            <MovieCards title={'Popular on Netflix'} />
            <MovieCards title={'Only on Netflix'} />
            <MovieCards title={'Top Picks for You'} />
            <MovieCards title={'Upcoming'} />
            <MovieCards title={'Blockbuster Movies'} />
        </div>
    </div>
  )
}

export default Home