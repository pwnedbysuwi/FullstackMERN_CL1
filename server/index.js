import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

// Middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Routes
app.use('/posts', postRoutes);

const DB_URI = 'mongodb+srv://codingfxii:123123123@practice.jto9p.mongodb.net/test';
const PORT = process.env.PORT || 5000;

// Database Connection & Server Start
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server is running at: http://localhost:${PORT}`));
  })
  .catch((err) => console.error(`❌ Connection failed: ${err}`));

// Deprecation Fix
mongoose.set('useFindAndModify', false);
