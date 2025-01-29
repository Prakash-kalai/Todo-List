import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from "../../ApiUrl/apiUrl";

const initialState = {
    login: [],
    loading: false,
    error: null,
};

export const loginGetData = createAsyncThunk("login/loginGetData", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(ApiUrl.login.url);
        return response.data;
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            code: error.code,
            status: error.response?.status,
        });
    }
});

export const loginPostData = createAsyncThunk("login/loginPostData", async (data, { rejectWithValue }) => {    
    
    try {
        const response = await axios.post(ApiUrl.login.url,data);
        return response.data;
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            code: error.code,
            status: error.response?.status,
        });
    }
});


const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginGetData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginGetData.fulfilled, (state, action) => {
                state.loading = false;
                state.login = action.payload;
            })
            .addCase(loginGetData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginPostData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginPostData.fulfilled, (state, action) => {
                state.loading = false;
                state.login = [...state.login, action.payload];
            })
            .addCase(loginPostData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })            
    },
});

export default loginSlice.reducer;
