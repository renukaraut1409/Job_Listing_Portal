import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppliedJobs, setAllApplicants } from '@/redux/applicationSlice';
import AppliedJobTable from "./AdminJobsTable.jsx"

const Applicants = () => {
    const dispatch = useDispatch();
    const { appliedJobs, status, error } = useSelector(state => state.application);

    useEffect(() => {
        dispatch(fetchAppliedJobs());
    }, [dispatch]);

    // Optionally, use this to set all applicants manually if needed
    // dispatch(setAllApplicants(appliedJobs));

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Applied Jobs</h1>
            <AppliedJobTable />
        </div>
    );
};

export default Applicants;
