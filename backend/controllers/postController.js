import mongoose from "mongoose";
import Post from "../models/postModels.js";


// @desc    Fetch posts
// @route   GET /posts
// @access  Public
export const fetchPosts = async(req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch(err) {
        res.status(404);
        res.json({message: err.message, stack: err.stack});
    }
}

// @desc    Create a post
// @route   POST /posts
// @access  Public
export const createPost = async(req, res) => {
    try {
        
        const post = req.body;

        if (post.creator && post.title) {
            const newPost = new Post(post);

            await newPost.save();

            res.status(201).json(newPost);
        } else {
            res.status(400).json('All fields should be filled');
        }


    } catch(err) {
        res.status(409);
        res.json({message: err.message, stack: err.stack});
    }
}

// @desc    Update a post
// @route   PATCH /posts/:id
// @access  Public
export const updatePost = async(req, res) => {
    try {
        
        const id = req.params.id;
        const post = req.body;

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(404).send('No post found with that id');
        }
        

        const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true});

        res.status(202).json(updatedPost);


    } catch(err) {
        res.status(409);
        res.json({message: err.message, stack: err.stack});
    }
}