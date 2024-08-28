import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

// Thunk to fetch applied jobs
export const fetchAppliedJobs = createAsyncThunk(
    'application/fetchAppliedJobs',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
            return response.data.application; // Ensure this matches the API response structure
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data); // Handle errors
        }
    }
);

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        appliedJobs: [],
        status: 'idle', // Add status to manage loading and error states
        error: null,
    },
    reducers: {
        setAllApplicants: (state, action) => {
            state.appliedJobs = action.payload; // Adjust this based on what 'setAllApplicants' is supposed to do
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppliedJobs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
                state.appliedJobs = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchAppliedJobs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setAllApplicants } = applicationSlice.actions; // Export the action
export default applicationSlice.reducer;
