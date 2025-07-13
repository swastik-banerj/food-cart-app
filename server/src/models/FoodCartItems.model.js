import mongoose from "mongoose";

const foodCartModel = new mongoose.Schema({

    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItems"
    },

    quantity: {
        type: Number,
        required: true,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps:true});

export const FoodCartItems = mongoose.model('FoodCartItems', foodCartModel);


