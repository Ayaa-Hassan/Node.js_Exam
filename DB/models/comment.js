import mongoose from "mongoose";

const commentchema = new mongoose.Schema({
    postId: String,
    userId: String,
    comment: String,
    likes: String,
}, { timestamps: true });

export const commentModel = mongoose.model('Comment', commentchema);