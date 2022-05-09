import express from 'express';
import { fetchPosts, createPost, updatePost, deletePost } from '../controllers/postController.js';

const router = express.Router();

router.route('/')
    .get(fetchPosts)
    .post(createPost);

router.route('/:id')
    .patch(updatePost)
    .delete(deletePost);

export default router;