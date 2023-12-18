import mongoose from "mongoose";

const RestarauntSchema = new mongoose.Scheme(
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
        rating: Number,
        menuUrl: String,
    },
    {
        timestamps: true,
    },
)

export default mongoose.model('Restaraunt', RestarauntSchema);