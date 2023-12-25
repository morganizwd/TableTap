import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
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

export const createRestaurant = createAsyncThunk(
    'restaurants/create',
    async (restaurantData) => {
        const response = await axios.post('restaurant-create', restaurantData);
        return response.data;
    }
);

export const updateRestaurant = createAsyncThunk(
    'restaurants/update',
    async ({ id, updatedData }) => {
        const response = await axios.patch(`/restaurant-edit/${id}`, updatedData);
        return response.data;
    }
);

export const deleteRestaurant = createAsyncThunk(
    'restaurants/delete',
    async (id) => {
        await axios.delete(`/restaurant-delete/${id}`);
        return id;
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

            .addCase(createRestaurant.fulfilled, (state, action) => {
                state.restaurants.items.push(action.payload);
            })

            .addCase(updateRestaurant.fulfilled, (state, action) => {
                const index = state.restaurants.items.findIndex(
                    (restaurant) => restaurant._id === action.payload._id
                );
                if (index !== -1) {
                    state.restaurants.items[index] = action.payload;
                }
            })

            .addCase(deleteRestaurant.fulfilled, (state, action) => {
                state.restaurants.items = state.restaurants.items.filter(
                    (restaurant) => restaurant._id !== action.payload
                );
            });
    }
});

export const restaurantReducer = restarauntSlice.reducer;