import React, { useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('User state:', user);
    }, [user]);

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/logout`, {}, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <div className='bg-white shadow-md'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-20 px-4'>
                <div>
                    <h1 className='text-4xl font-bold text-purple-700'>
                        Job<span className='text-purple-500'>Hub</span>
                    </h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-8 text-purple-700'>
                        {/* Temporarily always show navigation links for debugging */}
                        <li className='text-lg'><Link to="/">Home</Link></li>
                        <li className='text-lg'><Link to="/jobs">Jobs</Link></li>
                        <li className='text-lg'><Link to="/browse">Browse</Link></li>
                        {user && user.role === 'recruiter' && (
                            <>
                                <li className='text-lg'><Link to="/admin/companies">Companies</Link></li>
                                <li className='text-lg'><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        )}
                        {user ? (
                            <li>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="@user" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 bg-white text-purple-700">
                                        <div className='p-4'>
                                            <div className='flex gap-2 items-center'>
                                                <Avatar className="cursor-pointer">
                                                    <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="@user" />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-medium text-lg'>{user?.fullname}</h4>
                                                    <p className='text-sm'>{user?.profile?.bio || 'No bio available'}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col my-2'>
                                                {user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link" className='text-lg text-purple-700'>
                                                            <Link to="/profile">View Profile</Link>
                                                        </Button>
                                                    </div>
                                                )}
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <LogOut />
                                                    <Button onClick={logoutHandler} variant="link" className='text-lg text-purple-700'>
                                                        Logout
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </li>
                        ) : (
                            <>
                                <li className='text-lg'><Link to="/login">
                                    <Button variant="outline" className='text-purple-700 border-purple-500'>Login</Button>
                                </Link></li>
                                <li className='text-lg'><Link to="/signup">
                                    <Button className="bg-purple-500 hover:bg-purple-600 text-white">Signup</Button>
                                </Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
