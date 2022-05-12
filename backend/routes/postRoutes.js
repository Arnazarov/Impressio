import express from 'express';
import { fetchPosts, createPost, updatePost, deletePost, likePost } from '../controllers/postController.js';
import protectApp from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/')
    .get(fetchPosts)
    .post(protectApp, createPost);

router.route('/:id')
    .patch(protectApp,updatePost)
    .delete(protectApp, deletePost);

router.route('/:id/like')
    .patch(protectApp, likePost);

export default router;