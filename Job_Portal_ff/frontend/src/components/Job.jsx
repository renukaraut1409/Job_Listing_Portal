import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return 'N/A';
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }

    return (
        <div className='flex flex-col p-5 rounded-md shadow-lg bg-white border border-gray-200 h-full'>
            <div className='flex items-center justify-between mb-4'>
                <p className='text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0
                        ? 'Today'
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            <div className='flex items-center gap-2 mb-4'>
                <Button className="p-1" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div className='mb-4'>
                <h1 className='font-bold text-lg'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap gap-2 mb-4'>
                <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-bold' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-bold' variant="ghost">{job?.salary} LPA</Badge>
            </div>

            <div className='flex items-center gap-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">
                    Details
                </Button>
                <Button className="bg-[#7209b7] text-white">
                    Save For Later
                </Button>
            </div>
        </div>
    );
}

export default Job;
