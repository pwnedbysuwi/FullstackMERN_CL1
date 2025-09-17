import mongoose from 'mongoose';

// Post schema definition
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150, // Title capped at 150 chars
    },
    message: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 2000, // Message between 10–2000 chars
    },
    creator: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.every((tag) => typeof tag === 'string'),
        message: 'All tags must be strings',
      },
    },
    selectedFile: {
      type: String,
      default: '',
    },
    likeCount: {
      type: Number,
      default: 0,
      min: [0, 'Likes cannot be negative'],
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt automatically
  }
);

// Export model
const Post = mongoose.model('Post', postSchema);
export default Post;
