import { createSlice, createAsyncThunk, isFulfilled } from "@reduxjs/toolkit";
import axios from "../axios.js";

export const fetchRestaurants = createAsyncThunk('restaurants/fetchProdicts', async () => {
    const { data } = await axios.get('restaurants')
    return data;
});

export const fetchRestaurantById = createAsyncThunk(
    'restaurants/fetchRestaurantById',
    async (id) => {
      const { data } = await axios.get(`/restaurant/${id}`);
      return data;
    }
);  

const initialState = { 
    restaurants: {
        items: [],
        status: 'loading',
    }
}

const restarauntSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fetchRestaurants
            .addCase(fetchRestaurants.pending, (state) => {
                state.restaurants.items = [];
                state.restaurants.status = 'loading';
            })
            .addCase(fetchRestaurants.fulfilled, (state, action) => {
                state.restaurants.items = action.payload;
                state.restaurants.status = 'loaded';
            })
            .addCase(fetchRestaurants.rejected, (state) => {
                state.restaurants.items = [];
                state.restaurants.status = 'error';
            })

            //fetchRestaurantById
            .addCase(fetchRestaurantById.pending, (state) => {
                state.currentRestaurant = null;
                state.status = 'loading';
            })
            .addCase(fetchRestaurantById.fulfilled, (state, action) => {
                state.currentRestaurant = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchRestaurantById.rejected, (state) => {
                state.currentRestaurant = null;
                state.status = 'error';
            })
    }
});

export const restaurantReducer = restarauntSlice.reducer;