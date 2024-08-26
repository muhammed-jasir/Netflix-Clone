import React from 'react'
import cards_data from '../assets/cards/Cards_data'

const MovieCards = ({title}) => {
    return (
        <div className='flex flex-col gap-4 w-full'>
            <h2 className='text-2xl font-semibold'>
                {title && title}
            </h2>

            <div className='flex gap-2.5 overflow-x-auto scrollbar-hide'>
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
    )
}

export default MovieCards