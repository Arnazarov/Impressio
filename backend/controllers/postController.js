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

// @desc    Search posts
// @route   GET /posts/search?searchQuery&page
// @access  Public
export const searchPosts = async(req, res) => {
    try {
        const { searchQuery, tags } = req.query;
        const title = searchQuery ? new RegExp(searchQuery, 'i') : '';

        // Search either by title or tags
        const postsFound = await Post.find({ $or: [{title}, {tags: {$in: tags.split(',')}}]});

        res.status(200).json(postsFound);
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
            const newPost = new Post({...post, creatorId: req.userId});

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

// @desc    Remove a post
// @route   DELETE /posts/:id
// @access  Public
export const deletePost = async(req, res) => {
    try {
        
        const id = req.params.id;

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(404).send('No post found with that id');
        }
        
        await Post.findByIdAndRemove(id);

        res.status(202).json({message: 'Post successfully deleted!'});


    } catch(err) {
        res.status(409);
        res.json({message: err.message, stack: err.stack});
    }
}

// @desc    Like a post
// @route   PATCH /posts/:id/like
// @access  Public
export const likePost = async(req, res) => {
    try {
        
        const id = req.params.id;

        if (!req.userId) {
            return res.json({message: 'Unauthorized!'})
        }

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(404).send('No post found with that id');
        }

        const post = await Post.findById(id);

        const index = await post.likes.findIndex(id => id === String(req.userId));

        if (index === -1) {
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter(id => id !== String(req.userId))
        }
        
        const updatedPost = await Post.findByIdAndUpdate(id, post, {new:true});
        res.status(202).json(updatedPost);


    } catch(err) {
        res.status(409);
        res.json({message: err.message, stack: err.stack});
    }
}