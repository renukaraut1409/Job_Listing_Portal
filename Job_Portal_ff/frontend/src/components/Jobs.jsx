import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 px-4'>
                <div className='flex gap-5'>
                    <div className='w-full md:w-1/4 lg:w-1/5'>
                        <FilterCard />
                    </div>
                    <div className='flex-1'>
                        {filterJobs.length === 0 ? (
                            <div className='text-center mt-10 text-gray-600'>No jobs found.</div>
                        ) : (
                            <div className='h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                    {filterJobs.map((job) => (
                                        <motion.div
                                            key={job?._id}
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex items-stretch"
                                        >
                                            <div className='w-full flex flex-col h-full'>
                                                <Job job={job} />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
