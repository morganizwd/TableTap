import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }, 
        restaraunt: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaraunt',
            required: true,
        }
    }
)