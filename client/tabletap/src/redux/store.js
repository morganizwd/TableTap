import { configureStore } from '@reduxjs/toolkit';
import { restaurantReducer } from './slices/restaurants';
import { reviewReducer } from './slices/reviews';

const store = configureStore({
    reducer: {
        restaurants: restaurantReducer,
        reviews: reviewReducer,
    }
});

export default store;