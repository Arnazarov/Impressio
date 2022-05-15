import express from 'express';
import { fetchPosts, createPost, updatePost, deletePost, likePost, searchPosts, fetchPost } from '../controllers/postController.js';
import protectApp from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/')
    .get(fetchPosts)
    .post(protectApp, createPost);

router.route('/search')
    .get(searchPosts);

router.route('/:id')
    .get(fetchPost)
    .patch(protectApp,updatePost)
    .delete(protectApp, deletePost);

router.route('/:id/like')
    .patch(protectApp, likePost);



export default router;