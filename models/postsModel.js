import mongoose from "mongoose";

// Creating schema
const postSchema = new mongoose.Schema({
    postText: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

//Creating Model
export const Post = mongoose.model('Post', postSchema);