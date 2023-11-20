import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        asset: {
            type: Number,
            default: 0
        },
        debt: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const User = models.User || mongoose.model('User', userSchema);

export default User;