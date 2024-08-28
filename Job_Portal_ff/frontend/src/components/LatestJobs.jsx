import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job);

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold mb-5'>
                <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
            </h1>
            {allJobs.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))}
                </div>
            ) : (
                <p>No jobs available</p>
            )}
        </div>
    );
};

export default LatestJobs;
