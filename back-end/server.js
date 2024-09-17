// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const multer = require('multer');
// const path = require('path');

// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(cors());

// const PORT = process.env.PORT || 5000;

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// // Blog Post Schema
// const postSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   imageUrl: { type: String }, 
//   date: { type: Date, default: Date.now }
// });

// const Post = mongoose.model('Post', postSchema);

// // Multer storage setup
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid filename conflicts
//     }
//   });
  
//   const upload = multer({ storage });
  
//   // Serve uploaded images
//   app.use('/uploads', express.static('uploads'));

// // Routes

// // Get all posts
// app.get('/api/posts', async (req, res) => {
//   const posts = await Post.find().sort({ date: -1 });
//   res.json(posts);
// });

// // Get single post
// app.get('/api/posts/:id', async (req, res) => {
//   const post = await Post.findById(req.params.id);
//   if (!post) return res.status(404).json({ msg: 'Post not found' });
//   res.json(post);
// });

// // Create a new post
// // app.post('/api/posts', async (req, res) => {
// //   const { title, content } = req.body;
// //   const newPost = new Post({ title, content });
// //   await newPost.save();
// //   res.json(newPost);
// // });

// app.post('/api/posts', upload.single('image'), async (req, res) => {
//     const { title, content } = req.body;
//     const newPost = new Post({
//       title,
//       content,
//       imageUrl: req.file ? `/uploads/${req.file.filename}` : null  // Store the image URL
//     });
//     await newPost.save();
//     res.json(newPost);
//   });

// // Edit post
// // app.put('/api/posts/:id', async (req, res) => {
// //   const { title, content } = req.body;
// //   const post = await Post.findById(req.params.id);
// //   if (!post) return res.status(404).json({ msg: 'Post not found' });
  
// //   post.title = title || post.title;
// //   post.content = content || post.content;
// //   await post.save();
// //   res.json(post);
// // });

// app.put('/api/posts/:id', upload.single('image'), async (req, res) => {
//     const { title, content } = req.body;
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ msg: 'Post not found' });
    
//     post.title = title || post.title;
//     post.content = content || post.content;
//     if (req.file) {
//       post.imageUrl = `/uploads/${req.file.filename}`;
//     }
//     await post.save();
//     res.json(post);
//   });
  

// // Delete post
// // app.delete('/api/posts/:id', async (req, res) => {
// //   const post = await Post.findByIdAndDelete(req.params.id);
// //   if (!post) return res.status(404).json({ msg: 'Post not found' });
// //   res.json({ msg: 'Post deleted' });
// // });

// app.delete('/api/posts/:id', async (req, res) => {
//     const post = await Post.findByIdAndDelete(req.params.id);
//     if (!post) return res.status(404).json({ msg: 'Post not found' });
//     res.json({ msg: 'Post deleted' });
//   });

// // Listen on port
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require("fs")
const path = require('path');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("server is running successfully")
});

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Blog Post Schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },  // Add image URL field
  date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// Multer storage setup
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid filename conflicts
  }
});

const upload = multer({ storage });


// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

// Routes
app.get('/api/posts', async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
});

app.get('/api/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ msg: 'Post not found' });
  res.json(post);
});

// Create post with image upload
app.post('/api/posts', (req, res) => {
    upload.single('image')(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: 'Multer Error: ' + err.message });
      } else if (err) {
        return res.status(500).json({ message: 'Unknown Error: ' + err.message });
      }
      const { title, content } = req.body;
      const newPost = new Post({
        title,
        content,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null
      });
  
      newPost.save()
        .then(post => res.json(post))
        .catch(err => res.status(500).json({ message: 'Error saving post: ' + err.message }));
    });
  });
  
  

app.put('/api/posts/:id', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ msg: 'Post not found' });
  
  post.title = title || post.title;
  post.content = content || post.content;
  if (req.file) {
    post.imageUrl = `/uploads/${req.file.filename}`;
  }
  await post.save();
  res.json(post);
});

app.delete('/api/posts/:id', async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ msg: 'Post not found' });
  res.json({ msg: 'Post deleted' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
