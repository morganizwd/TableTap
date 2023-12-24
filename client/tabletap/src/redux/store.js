import { configureStore } from '@reduxjs/toolkit';
import { restaurantReducer } from './slices/restaurants';
import { reviewReducer } from './slices/reviews';
import { reseravationReducer } from './slices/reservations';

const store = configureStore({
    reducer: {
        restaurants: restaurantReducer,
        reviews: reviewReducer,
        reservations: reseravationReducer,
    }
});

export default store;