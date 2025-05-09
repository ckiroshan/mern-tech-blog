import Post from "../models/Post.js";
import jwt from "jsonwebtoken";
import { deleteFromS3, uploadToS3 } from "../config/s3Service.js";

const secretKey = "jkhas!kd87&*2e#gjshghjsgd";

// Create Post
export const AddPost = async (req, res) => {
  const { buffer, originalname } = req.file; // Get file buffer directly
  const ext = originalname.split(".").pop();
  const newFileName = `${Date.now()}.${ext}`;

  // Upload buffer directly to S3
  const s3Url = await uploadToS3(buffer, newFileName);

  const { token } = req.cookies;
  jwt.verify(token, secretKey, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content, categories } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: s3Url,
      author: info.id,
      categories: JSON.parse(categories),
      isApproved: false,
    });
    res.json(postDoc);
  });
};

// Get all posts
export const getAllPosts = async (req, res) => {
  const { category, page = 1, limit = 3 } = req.query;
  const filter = category ? { categories: category, isApproved: true } : { isApproved: true };
  const posts = await Post.find(filter)
    .populate("author", ["username"])
    .sort({ updatedAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
  const count = await Post.countDocuments(filter);
  res.json({
    posts,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    totalPosts: count,
  });
};

// Get Post by ID
export const getPost = async (req, res) => {
  const { id } = req.params;
  res.json(await Post.findById(id).populate("author", ["username"]));
};

// Update Post by ID
export const modifyPost = async (req, res) => {
  let s3Url = null;
  if (req.file) {
    const { buffer, originalname } = req.file; // Get buffer directly
    const ext = originalname.split(".").pop();
    const newFileName = `${Date.now()}.${ext}`;

    // Upload buffer directly to S3
    s3Url = await uploadToS3(buffer, newFileName);
  }

  const { token } = req.cookies;
  jwt.verify(token, secretKey, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content, categories } = req.body;
    const postDoc = await Post.findById(id);
    // Check if user is admin OR the author
    const isAdmin = info.isAdmin;
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAdmin && !isAuthor) {
      return res.status(403).json("You are not authorized to edit this post");
    }
    // Delete old file from S3 if updating with new file
    if (req.file && postDoc.cover) {
      try {
        await deleteFromS3(postDoc.cover);
      } catch (err) {
        console.error("Error deleting old file from S3:", err);
      }
    }
    await postDoc.update({
      title,
      summary,
      content,
      cover: s3Url || postDoc.cover,
      author: isAdmin ? postDoc.author : info.id,
      categories: JSON.parse(categories),
      isApproved: false,
    });
    res.json(postDoc);
  });
};

// Get all Posts by User's ID
export const getUserPosts = async (req, res) => {
  try {
    const { page = 1, limit = 3 } = req.query;
    const { userId } = req.params;

    const posts = await Post.find({ author: userId })
      .populate("author", ["username"])
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Post.countDocuments({ author: userId });

    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalPosts: count,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all pending posts (admin only)
export const getPendingPosts = async (req, res) => {
  const posts = await Post.find({ isApproved: false }).populate("author", ["username"]);
  res.json(posts);
};

// Approve/reject posts (admin only)
export const moderatePost = async (req, res) => {
  const { postId, action } = req.body;
  // action: 'approve' or 'reject'
  const update = action === "approve" ? { isApproved: true } : { isApproved: false };
  const post = await Post.findByIdAndUpdate(postId, update, { new: true });
  res.json(post);
};