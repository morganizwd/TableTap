import { configureStore } from '@reduxjs/toolkit';
import { restaurantReducer } from './slices/restaurants';
import { reviewReducer } from './slices/reviews';
import { reservationReducer } from './slices/reservations';
import { authReducer } from './slices/auth';
import { restaurantadminsReducer } from './slices/restaurantAdmins';

const store = configureStore({
    reducer: {
        restaurants: restaurantReducer,
        reviews: reviewReducer,
        reservations: reservationReducer,
        auth: authReducer,
        restaurantadmins: restaurantadminsReducer,
    }
});

export default store;