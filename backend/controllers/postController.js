import mongoose from "mongoose";
import Post from "../models/postModels.js";


// @desc    Fetch posts
// @route   GET /posts?page
// @access  Public
export const fetchPosts = async(req, res) => {
    try {
        const pageNumber = Number(req.query.page) || 1;
        const pageSize = 8;
        const count = await Post.countDocuments({});

        const posts = await Post.find({}).limit(pageSize).skip(pageSize * (pageNumber - 1));

        res.status(200).json({posts, pageNumber, pages: Math.ceil(count/pageSize) });

    } catch(err) {
        res.status(404);
        res.json({message: err.message, stack: err.stack});
    }
}

// @desc    Fetch single post
// @route   GET /posts/:id
// @access  Public
export const fetchPost = async(req, res) => {
    try {
        const {id} = req.params;

        const post = await Post.findById(id);

        res.status(200).json(post);

    } catch(err) {
        res.status(404);
        res.json({message: err.message, stack: err.stack});
    }
}

// @desc    Search posts
// @route   GET /posts/search?searchQuery&tags
// @access  Public
export const searchPosts = async(req, res) => {
    try {
        const { searchQuery, tags } = req.query;
        const title = searchQuery ? new RegExp(searchQuery, 'i') : '';
        let postsFound;

        if (title || tags) {
            // Search either by title or tags
            postsFound = await Post.find({ $or: [{title}, {tags: {$in: tags.split(',')}}]});
        } else {
            postsFound = await Post.find({});
        }

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