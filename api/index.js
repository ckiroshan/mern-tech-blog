import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8021;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
