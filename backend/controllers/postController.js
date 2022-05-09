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

        const newPost = new Post(post);

        await newPost.save();

        res.status(201).json(newPost);


    } catch(err) {
        res.status(404);
        res.json({message: err.message, stack: err.stack});
    }
}