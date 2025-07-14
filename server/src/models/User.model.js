import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    
    email:{
        type: String,
        required: true,
        unique: true,
        trim:true,
    },

    password:{
        type: String,
        required: true,
    },

    profilePic:{
        type: String,
    }

}, {timestamps: true});

export const User = mongoose.model('User', userModel);
