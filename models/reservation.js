import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
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
        guestsAmount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'confirmed', 'cancelled', 'completed'] // Добавлено 'completed'
        },
        timeSlots:{
            type: [String],
            required: true
        },
        tableNumber: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Reservation', ReservationSchema);