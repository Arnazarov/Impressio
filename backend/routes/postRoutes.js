import express from 'express';
import { fetchPosts, createPost, updatePost } from '../controllers/postController.js';

const router = express.Router();

router.route('/')
    .get(fetchPosts)
    .post(createPost);

router.route('/:id', updatePost);

export default router;