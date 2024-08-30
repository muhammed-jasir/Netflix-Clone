import React from 'react';

const Spinner = () => {
    return (
        <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-red-800"></div>
        </div>
    );
};

export default Spinner;