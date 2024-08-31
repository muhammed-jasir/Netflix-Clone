import React from 'react';

const Spinner = ({borderColor}) => {
    return (
        <div className="flex justify-center items-center py-2">
            <div className={`animate-spin rounded-full h-8 w-8 border-t-4 ${borderColor}`}></div>
        </div>
    );
};

export default Spinner;