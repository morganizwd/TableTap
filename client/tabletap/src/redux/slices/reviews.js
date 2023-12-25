import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios.js";

export const fetchReviewsByRestaurant = createAsyncThunk(
  'reviews/fetchByRestaurant',
  async (restaurantId) => {
    const { data } = await axios.get(`/restaurant/${restaurantId}/reviews`);
    return data;
  }
);

export const fetchReviewsByUser = createAsyncThunk(
  `reviews/fetchReviewsByUser`, 
  async (userId) => {
    const { data } = await axios.get(`/reviews/user/${userId}`);
    return data;
  }
);

const initialState = {
  reviews: {
    items: [],
    status: 'loading',
  }
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) =>[
    builder
      //fetchReviewsByRestaurant
      .addCase(fetchReviewsByRestaurant.pending, (state) => {
        state.reviews.status = 'loading';
      })
      .addCase(fetchReviewsByRestaurant.fulfilled, (state, action) => {
        state.reviews.items = action.payload; // Assuming the payload is an array of reviews
        state.reviews.status = 'loaded';
      })
      .addCase(fetchReviewsByRestaurant.rejected, (state) => {
        state.reviews.status = 'error';
      })
      
      //fetchReviewsByUser
      .addCase(fetchReviewsByUser.pending, (state) => {
        state.reviews.status = 'loading';
      })
      .addCase(fetchReviewsByUser.fulfilled, (state, action) => {
        state.reviews.items = action.payload; // Assuming the payload is an array of reviews
        state.reviews.status = 'loaded';
      })
      .addCase(fetchReviewsByUser.rejected, (state) => {
        state.reviews.status = 'error';
      })
  ]
});

export const reviewReducer = reviewSlice.reducer;