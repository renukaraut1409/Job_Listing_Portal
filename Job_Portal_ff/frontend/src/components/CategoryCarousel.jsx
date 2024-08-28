import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "UX/UI Designer",
    "Project Manager",
    "DevOps Engineer",
    "Database Administrator",
    "Marketing Specialist",
    "Product Manager",
    "Business Analyst"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="w-full max-w-xl mx-auto my-20">
            <Carousel>
                <CarouselContent>
                    {categories.map((category, index) => (
                        <CarouselItem key={index} className="flex-shrink-0 w-1/3 px-2">
                            <Button
                                onClick={() => searchJobHandler(category)}
                                variant="outline"
                                className="w-full rounded-full"
                            >
                                {category}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
