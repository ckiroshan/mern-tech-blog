import fs from "fs";
import Post from "../models/Post.js";
import jwt from "jsonwebtoken";

const secretKey = "jkhas!kd87&*2e#gjshghjsgd";

// Create Post
export const AddPost = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];

  // Create new path with forward slashes
  const newPath = path + "." + ext;
  const normalizedPath = newPath.replace(/\\/g, "/");

  // Rename the file first
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secretKey, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content, categories } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: normalizedPath,
      author: info.id,
      categories: JSON.parse(categories),
    });
    res.json(postDoc);
  });
};

// Get all posts
export const getAllPosts = async (req, res) => {
  const { category } = req.query;
  const filter = category ? { categories: category } : {};
  res.json(await Post.find(filter).populate("author", ["username"]).sort({ updatedAt: -1 }));
};

// Get Post by ID
export const getPost = async (req, res) => {
  const { id } = req.params;
  res.json(await Post.findById(id).populate("author", ["username"]));
};

// Update Post by ID
export const modifyPost = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];

    // Create new path with forward slashes
    newPath = path + "." + ext;

    // Rename the file first
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secretKey, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content, categories } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("You are not the author!");
    }
    await postDoc.update({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
      author: info.id,
      categories: JSON.parse(categories),
    });
    res.json(postDoc);
  });
};