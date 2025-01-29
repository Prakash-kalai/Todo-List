import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from "../../ApiUrl/apiUrl";

const initialState = {
    signin: [],
    loading: false,
    error: null,
};

export const signGetData = createAsyncThunk("signin/signGetData", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(ApiUrl.signin.url);
        return response.data;
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            code: error.code,
            status: error.response?.status,
        });
    }
});

export const signPostData = createAsyncThunk("signin/signPostData", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(ApiUrl.signin.url,data);
        return response.data;
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            code: error.code,
            status: error.response?.status,
        });
    }
});


const signSlice = createSlice({
    name: "signin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signGetData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signGetData.fulfilled, (state, action) => {
                state.loading = false;
                state.signin = action.payload;
            })
            .addCase(signGetData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signPostData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signPostData.fulfilled, (state, action) => {
                state.loading = false;
                state.signin = [...state.signin, action.payload];
            })
            .addCase(signPostData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })            
    },
});

export default signSlice.reducer;
