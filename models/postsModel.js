import mongoose from "mongoose";

// Creating schema
const postSchema = new mongoose.Schema({
    postText: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    }
});

//Creating Model
export const Post = mongoose.model('Post', postSchema);