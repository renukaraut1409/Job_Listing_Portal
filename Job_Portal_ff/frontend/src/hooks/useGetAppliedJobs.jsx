import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application));
                } else {
                    toast.error('Failed to fetch applied jobs.');
                }
            } catch (error) {
                console.error(error);
                toast.error('An error occurred while fetching applied jobs.');
            }
        };
        
        fetchAppliedJobs();
    }, [dispatch]); // Include dispatch as a dependency to avoid potential issues

    return null; // This hook does not need to return anything
};

export default useGetAppliedJobs;
