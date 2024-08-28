import React, { useRef, useEffect } from 'react'
import cards_data from '../assets/cards/Cards_data'

const MovieCards = ({ title }) => {
    // const movieCardRef = useRef();

    // const handleScrollWheel =  (e) => {
    //     e.preventDefault();
    //     movieCardRef.current.scrollLeft += e.deltaY;
    // };

    // useEffect(() => {
    //     // movieCardRef.current.addEventListener('wheel', handleScrollWheel);
    // }, []);

    return (
        <div className='flex flex-col gap-4 w-full'>
            <h2 className='text-2xl font-semibold'>
                {title && title}
            </h2>
            <div className='w-full px-4 sm:px-6'>
                <div 
                    className='flex gap-2.5 items-center overflow-x-auto scrollbar-hide' 
                    // ref={movieCardRef}
                >
                    {cards_data.map((card, index) => (
                        <div
                            key={index}
                            className='min-w-[200px] md:min-w-[250px] lg:min-w-[300px] flex-shrink-0'
                        >
                            <img
                                src={card.image}
                                alt=''
                                className='cursor-pointer w-full h-auto rounded'
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieCards