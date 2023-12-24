import { configureStore } from '@reduxjs/toolkit';
import { restaurantReducer } from './slices/restaurants';
import { reviewReducer } from './slices/reviews';
import { reseravationReducer } from './slices/reservations';
import { authReducer } from './slices/auth';

const store = configureStore({
    reducer: {
        restaurants: restaurantReducer,
        reviews: reviewReducer,
        reservations: reseravationReducer,
        auth: authReducer,
    }
});

export default store;