import mongoose from "mongoose";

const RestarauntSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        description : {
            type: String,
            required: true,
        },
        tables: [{
            number: Number, 
            seats: Number, 
            isAvailable: Boolean, 
        }],
        rating: Number,
        menuUrl: String,
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Restaraunt', RestarauntSchema);