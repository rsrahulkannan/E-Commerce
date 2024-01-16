import mongoose, { Schema } from "mongoose";

const tokenSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
})

const token = mongoose.model('Token', tokenSchema);

export default token;