import express from "express";
import { login, logout, modifyUser, profile, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register); // Create User
router.post("/login", login); // Login User
router.get("/profile", profile); // User Profile
router.put("/update", modifyUser); // Update User
router.post("/logout", logout); // Logout User

export default router;
