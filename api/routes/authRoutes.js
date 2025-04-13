import express from "express";
import { login, profile, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register); // Create User
router.post("/login", login); // Login User
router.get("/profile", profile); // User Profile

export default router;
