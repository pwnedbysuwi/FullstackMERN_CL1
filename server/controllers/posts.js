import express from 'express';
import mongoose from 'mongoose';
import Post from '../models/postMessage.js';

const router = express.Router();

/**
 * Get all posts
 */
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * Get a single post by ID
 */
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * Create a new post
 */
export const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;

  const newPost = new Post({ title, message, selectedFile, creator, tags });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/**
 * Update an existing post
 */
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  const updatedPost = { title, message, creator, tags, selectedFile, _id: id };

  try {
    const post = await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Delete a post
 */
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  try {
    await Post.findByIdAndDelete(id);
    res.json({ message: 'Post removed successfully.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Like a post (increment likes)
 */
export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  try {
    const post = await Post.findById(id);
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export default router;
