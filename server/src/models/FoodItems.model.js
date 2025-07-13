import mongoose from "mongoose";

const foodItemModel = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        trim: true,
        index: true,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        trim: true,
    },

    foodImg: {
        type: String,
    }
}, {timestamps: true});

export const FoodItems = mongoose.model('FoodItems', foodItemModel);
