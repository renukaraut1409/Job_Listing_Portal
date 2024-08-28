import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        options: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Ahmedabad", "Surat", "Indore", "Surendranagar"]
    },
    {
        filterType: "Industry",
        options: [
            "Frontend Developer",
            "Backend Developer",
            "FullStack Developer",
            "Data Science",
            "Graphic Designer",
            "UI/UX Designer",
            "Product Manager",
            "Marketing Specialist",
            "DevOps Engineer",
            "System Analyst"
        ]
    },
    // {
    //     filterType: "Salary",
    //     options: [
    //         "0-40K LPA", 
    //         "42K-1LPA ", 
    //         "1LPA-5LPA", 
    //         "2LPA-3LPA", 
    //         "5LPA-8LPA", 
    //         "8LPA-10LPA", 
    //     ]
    // },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className="w-full bg-white p-3 rounded-md shadow-md">
            <h1 className="font-bold text-lg">Filter Jobs</h1>
            <hr className="mt-3 mb-4" />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterData.map((filter, index) => (
                    <div key={index} className="mb-4">
                        <h2 className="font-semibold text-md mb-2">{filter.filterType}</h2>
                        {filter.options.map((option, idx) => {
                            const itemId = `id-${index}-${idx}`;
                            return (
                                <div key={itemId} className="flex items-center space-x-2 my-2">
                                    <RadioGroupItem value={option} id={itemId} />
                                    <Label htmlFor={itemId}>{option}</Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
