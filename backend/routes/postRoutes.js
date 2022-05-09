import express from 'express';
import { fetchPosts, createPost } from '../controllers/postController.js';

const router = express.Router();

router.route('/')
    .get(fetchPosts)
    .post(createPost);

export default router;