import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);

  // Fetch all jobs when the component mounts
  useGetAllJobs();

  useEffect(() => {
    // Reset the search query when the component unmounts
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl mb-10'>Search Results ({allJobs.length})</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {allJobs.length > 0 ? (
            allJobs.map((job) => <Job key={job._id} job={job} />)
          ) : (
            <p className='text-center col-span-full'>No jobs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
