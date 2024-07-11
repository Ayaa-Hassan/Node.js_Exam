import mongoose from "mongoose";

const postchema =new mongoose.Schema({
    title: String,
    text: String,
    like: {
        type: [String],
        default: []
    },
    userId: {
        type: String,
        required: true
    },
},{timestamps:true});
 
export const postModel = mongoose.model('Post', postchema);