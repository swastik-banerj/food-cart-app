import mongoose from "mongoose";

const foodCartSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    items: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
    }],

    totalPrice:{
        type: Number,
        required: true,
        default: 0
    }

}, { timestamps: true });

foodCartSchema.methods.calculateTotalPrice = function () {
    this.totalPrice = this.items.reduce((total, currItem) => { 
        return total + currItem.quantity*currItem.price }, 0);

    return this.totalPrice;
}

export const FoodCartItems = mongoose.model('FoodCartItems', foodCartSchema);


