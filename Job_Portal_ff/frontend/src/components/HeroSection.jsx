import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (query.trim()) {
            dispatch(setSearchedQuery(query.trim()));
            navigate("/browse");
        }
    };

    return (
        <div className='relative bg-gradient-to-r from-purple-800 to-purple-600 text-white py-20 px-4'>
            <div className='relative z-10 text-center'>
                <span className='mx-auto px-4 py-2 rounded-full bg-white text-purple-800 font-medium shadow-lg inline-block'>
                    Discover Your Future
                </span>
                <h1 className='text-4xl md:text-5xl font-bold my-4'>
                    Find Your <span className='text-yellow-400'>Dream Job</span> Today
                </h1>
                <p className='text-lg md:text-xl mb-6'>
                    Explore thousands of job opportunities and take the next step in your career with ease. Join our community of professionals and find the perfect match for your skills and ambitions.
                </p>
                <div className='flex max-w-3xl mx-auto shadow-lg border border-gray-200 rounded-full overflow-hidden bg-white'>
                    <input
                        type="text"
                        placeholder='Search for jobs, companies, or keywords...'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className='flex-1 px-6 py-4 outline-none border-none text-gray-700 placeholder-gray-500 text-lg'
                    />
                    <Button 
                        onClick={searchJobHandler} 
                        className=" bg-white text-black  flex items-center justify-center px-4 mt-2 py-5 rounded-full"
                        aria-label="Search"
                    >
                        <Search className='h-10 w-7' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
