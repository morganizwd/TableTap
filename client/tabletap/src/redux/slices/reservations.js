import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios.js";

export const fetchReservationsByRestaurant = createAsyncThunk(
    'reservations/fetchByRestaurant',
    async (restaurantId) => {
        const { data } = await axios.get(`/restaurant/${restaurantId}/reservations`);
        return data;
    }
);

export const createReservation = createAsyncThunk(
    'reservations/create',
    async (reservationData) => {
        const response = await axios.post(`/restaurant/${reservationData.restaurantId}/reservation-create`, reservationData);
        return response.data;
    }
);

export const deleteReservation = createAsyncThunk(
    'reservations/delete',
    async ({ restaurantId, reservationId }) => {
        await axios.delete(`/restaurant/${restaurantId}/reservation-delete/${reservationId}`);
        return reservationId;
    }
);

const initialState = {
    reservations: {
        items: [],
        status: 'loading',
    }
};

const reservationSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            .addCase(createReservation.fulfilled, (state, action) => {
                state.reservations.items.push(action.payload);
            })
            .addCase(deleteReservation.fulfilled, (state, action) => {
                state.reservations.items = state.reservations.items.filter(
                    (reservation) => reservation._id !== action.payload
                );
            });
    }
});

export const reservationReducer = reservationSlice.reducer;