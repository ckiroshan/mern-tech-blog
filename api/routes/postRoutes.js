import express from "express";
import { AddPost } from "../controllers/postController.js";
import multer from "multer";

const uploadMiddleware = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/posts", uploadMiddleware.single("file"), AddPost); // Add new Post

export default router;
