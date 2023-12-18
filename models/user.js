import e from "express";
import mongoose from "mongoose";

const UserChema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        avatarUrl: String,
    },
    {
        timestamps: true,
    },
)

UserSchema.index({ email: 1 }, { unique: true });

export default mongoose.model('User', UserChema);