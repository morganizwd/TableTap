import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        workingHours: {
            open: String, // Например, '09:00'
            close: String, // Например, '22:00'
        },
        tables: [{
            number: Number, 
            seats: Number,
            bookings: [{
                date: String, // Используйте формат 'YYYY-MM-DD'
                times: [String], // Например, ['09:00', '10:00']
            }]
        }],
        cuisine: String,
        rating: Number,
        menuUrl: String,
        imageUrl: String,
        images: [String],
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Restaurant', RestaurantSchema);