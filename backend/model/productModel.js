import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {
            filename: {
                type: String,
                required: true
            },
            path: {
                type: String,
                required: true
            }
        }
    ],
    price: {
        type: Number,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
}, {
    timestamps: true
});

const Product = mongoose.model('save', productSchema);

export default Product;