import express from "express";
import { AddPost, getAllPosts, getPost } from "../controllers/postController.js";
import multer from "multer";

const uploadMiddleware = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/posts", uploadMiddleware.single("file"), AddPost); // Add new Post
router.get("/posts", getAllPosts); // Get all Posts
router.get("/posts/:id", getPost); // Get Post by ID
router.put("/posts", uploadMiddleware.single("file"), modifyPost); // Update Post by ID

export default router;
