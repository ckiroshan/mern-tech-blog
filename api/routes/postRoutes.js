import express from "express";
import { AddPost, getAllPosts } from "../controllers/postController.js";
import multer from "multer";

const uploadMiddleware = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/posts", uploadMiddleware.single("file"), AddPost); // Add new Post
router.get("/posts", getAllPosts); // Get all Posts

export default router;
