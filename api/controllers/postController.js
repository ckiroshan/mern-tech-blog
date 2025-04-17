import fs from "fs";
import Post from "../models/Post.js";
import jwt from "jsonwebtoken";

const secretKey = "jkhas!kd87&*2e#gjshghjsgd";

// Create User
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
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: normalizedPath,
      author: info.id,
    });
    res.json(postDoc);
  });
};
