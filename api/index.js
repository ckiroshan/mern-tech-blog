import express from "express";
import cors from "cors";
import db from "./config/db.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
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

// Apply DB connection middleware globally
app.use(db.connectionMiddleware());

// Test endpoint (Check if connection status is OK first)
app.get("/api/test-db", db.testConnectionHandler);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", postRoutes);

const PORT = process.env.PORT || 8021;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
