import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    message: String,
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [] 
    }, 
    comments: {
        type: [String], 
        default: []
    }
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema);

export default Post;