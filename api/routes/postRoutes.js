import express from "express";
import { AddPost, getAllPosts, getPendingPosts, getPost, getUserPosts, moderatePost, modifyPost } from "../controllers/postController.js";
import multer from "multer";
import { isAdmin } from "../controllers/authController.js";

const uploadMiddleware = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/posts", uploadMiddleware.single("file"), AddPost); // Add new Post
router.get("/posts", getAllPosts); // Get all Posts
router.get("/posts/:id", getPost); // Get Post by ID
router.put("/posts", uploadMiddleware.single("file"), modifyPost); // Update Post by ID
router.get("/posts/user/:userId", getUserPosts); // Get all Posts by User's ID
router.get("/posts/pending", isAdmin, getPendingPosts); // Get all posts waiting for approval (Admin Only)
router.post("/posts/moderate", isAdmin, moderatePost); // Approve / Reject a post

export default router;
