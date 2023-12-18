import mongoose from "mongoose";

const RestaurantAdminSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }, 
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('RestaurantAdmin', RestaurantAdminSchema);