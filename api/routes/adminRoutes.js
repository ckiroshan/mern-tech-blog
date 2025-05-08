import express from "express";
import { getAdminStats, getAllUsers, getPendingPosts, approvePostById, deletePostById, deleteUserById, getUserById, updateUserById, getApprovedPosts } from "../controllers/adminController.js";
import { isAdmin } from "../controllers/authController.js";

const router = express.Router();

// All routes protected by isAdmin middleware
router.get("/stats", isAdmin, getAdminStats);
router.get("/users", isAdmin, getAllUsers);
router.get("/posts", isAdmin, getApprovedPosts); 
router.get("/posts/pending", isAdmin, getPendingPosts);
router.put("/posts/:postId/approve", isAdmin, approvePostById);
router.delete("/posts/:postId", isAdmin, deletePostById);
router.delete("/users/:userId", isAdmin, deleteUserById);
router.get("/users/:userId", isAdmin, getUserById);
router.put("/users/:userId", isAdmin, updateUserById);

export default router;
