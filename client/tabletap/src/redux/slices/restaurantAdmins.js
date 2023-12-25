import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios.js";

export const fetchRestaurantAdmins = createAsyncThunk(
    '/restaurantadmins', async () => {
        const { data } = await axios.get('/restaurantadmins');
        return data;
    }
);

export const createRestaurantAdmin = createAsyncThunk(
    'restaurantadmins/create',
    async ({ userId, restaurantId }) => {
        const response = await axios.post('/restaurantadmin-create', { userId, restaurantId });
        return response.data;
    }
);

export const deleteRestaurantAdmin = createAsyncThunk(
    'restaurantadmins/delete',
    async (adminId) => {
        const response = await axios.delete(`/restaurantadmin-delete/${adminId}`);
        return response.data;
    }
);

const initialState = { 
    restaurantadmins: {
        items: [],
        status: 'loading',
    }
};

const restaurantadminsSlice = createSlice({
    name: 'restaurantadmins',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurantAdmins.pending, (state) => {
                state.restaurantadmins.status = 'loading';
            })
            .addCase(fetchRestaurantAdmins.fulfilled, (state, action) => {
                state.restaurantadmins.items = action.payload; 
                state.restaurantadmins.status = 'loaded';
            })
            .addCase(fetchRestaurantAdmins.rejected, (state) => {
                state.restaurantadmins.status = 'error';
            })
            .addCase(createRestaurantAdmin.fulfilled, (state, action) => {
                state.restaurantadmins.items.push(action.payload);
            })
            .addCase(deleteRestaurantAdmin.fulfilled, (state, action) => {
                state.restaurantadmins.items = state.restaurantadmins.items.filter(
                    (admin) => admin._id !== action.payload._id
                );
            });
    }
});

export const restaurantadminsReducer = restaurantadminsSlice.reducer;
