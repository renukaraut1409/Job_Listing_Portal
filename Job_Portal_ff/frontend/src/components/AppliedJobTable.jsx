import React from 'react';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { appliedJobs } = useSelector((store) => store.application);

    // Ensure appliedJobs is an array
    if (!Array.isArray(appliedJobs)) {
        return <div className="p-4 text-center text-gray-600">No applied jobs found.</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {appliedJobs.length > 0 ? (
                        appliedJobs.map((job) => (
                            <tr key={job._id}> {/* Use unique identifier */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.company}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(job.dateApplied).toLocaleDateString()}</td> {/* Format date */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">No jobs applied</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AppliedJobTable;
