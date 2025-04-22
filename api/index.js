import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const client_URL = "http://localhost:5173";

// Middleware
app.use(cors({ credentials: true, origin: client_URL }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/uploads", express.static(join(__dirname, "uploads")));

// Database connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", postRoutes);

const PORT = process.env.PORT || 8021;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
