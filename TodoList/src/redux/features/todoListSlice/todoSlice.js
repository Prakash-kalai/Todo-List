import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ApiUrl from "../../ApiUrl/apiUrl";

const initialState = {
    todoList: [],
    loading: false,
    error: null,
};

export const getData = createAsyncThunk("TodoList/getData", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(ApiUrl.todoList.url);
        return response.data;
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            code: error.code,
            status: error.response?.status,
        });
    }
});

export const postData = createAsyncThunk("TodoList/postData", async (data, { rejectWithValue }) => {        
    try {
        const response = await axios.post(ApiUrl.todoList.url,data);
        return response.data;
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            code: error.code,
            status: error.response?.status,
        });
    }
});


export const updateData = createAsyncThunk("TodoList/updateData", async (data, { rejectWithValue }) => {    
        try {            
            const response = await axios.put(ApiUrl.update.url,data);
            return  response.data;
        
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            code: error.code,
            status: error.response?.status,
        });
    
    }    
});


export const deleteData = createAsyncThunk("TodoList/deleteData", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${ApiUrl.todoList.url}/delete`, { id });
        return response.data;
    } catch (error) {
        return rejectWithValue({
            message: error.message,
            code: error.code,
            status: error.response?.status,
        });
    }
});

const todoSlice = createSlice({
    name: "TodoList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.loading = false;
                state.todoList = action.payload;
            })
            .addCase(getData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(postData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postData.fulfilled, (state, action) => {
                state.loading = false;
                state.todoList = [...state.todoList, action.payload];
            })
            .addCase(postData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateData.fulfilled, (state, action) => {
                state.loading = false;
                state.todoList = [...state.todoList, action.payload];
})
            .addCase(updateData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteData.fulfilled, (state, action) => {
                state.loading = false;
                state.todoList = state.todoList.filter((item) => item.id !== action.payload.id);
            })
            .addCase(deleteData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default todoSlice.reducer;
