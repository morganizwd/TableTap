import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema(
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
        text: String,
        rate: Number,
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Review', ReviewSchema);