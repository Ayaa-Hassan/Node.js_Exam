import mongoose from "mongoose";

const userschem = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    age:Number,
   
}, { timestamps: true });
export const userModel=mongoose.model("User",userschem);