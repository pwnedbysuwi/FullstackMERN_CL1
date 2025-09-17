import express from 'express';

import { 
  getPosts, 
  getPost, 
  createPost, 
  updatePost, 
  likePost, 
  deletePost 
} from '../controllers/posts.js';

const router = express.Router();

// Routes
router.get('/', getPosts);             // Fetch all posts
router.post('/', createPost);          // Create a new post
router.get('/:id', getPost);           // Fetch a single post by ID
router.patch('/:id', updatePost);      // Update a specific post
router.delete('/:id', deletePost);     // Delete a post
router.patch('/:id/like', likePost);   // Like a post (renamed endpoint for clarity)

export default router;
