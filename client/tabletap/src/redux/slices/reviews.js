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

export const createReview = createAsyncThunk(
  'reviews/create',
  async ({ restaurantId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/restaurant/${restaurantId}/review-create`, reviewData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/delete',
  async (reviewId, { rejectWithValue }) => {
    try {
      await axios.delete(`/restaurant/review-delete/${reviewId}`);
      return reviewId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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

      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.items.push(action.payload); // Добавление нового отзыва в состояние
      })
      .addCase(createReview.rejected, (state, action) => {
        console.error('Ошибка при создании отзыва:', action.payload);
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews.items = state.reviews.items.filter(
          (review) => review._id !== action.payload
        );
      })
      
  ]
});

export const reviewReducer = reviewSlice.reducer;