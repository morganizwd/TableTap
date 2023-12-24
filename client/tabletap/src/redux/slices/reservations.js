import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios.js";

export const fetchReservationsByRestaurant = createAsyncThunk(
    'reservations/fetchByRestaurant',
    async (restaurantId) => {
        const { data } = await axios.get(`/restaurant/${restaurantId}/reservations`);
        return data;
    }
);

const initialState = {
    reservations: {
        items: [],
        status: 'loading',
    }
};

const reseravationSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {},
    extraReducers: (builder) => [
        builder
            //fetchReservationsByRestaurant
            .addCase(fetchReservationsByRestaurant.pending, (state) => {
                state.reservations.status = 'loading';
            })
            .addCase(fetchReservationsByRestaurant.fulfilled, (state, action) => {
                state.reservations.items = action.payload; 
                state.reservations.status = 'loaded';
            })
            .addCase(fetchReservationsByRestaurant.rejected, (state) => {
                state.reservations.status = 'error';
            })
    ]
});

export const reseravationReducer = reseravationSlice.reducer;