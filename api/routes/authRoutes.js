import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register); // Create User
router.post("/login", login); // Login User

export default router;
