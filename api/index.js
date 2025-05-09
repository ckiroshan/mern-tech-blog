import express from "express";
import cors from "cors";
import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
const allowedOrigins = ["http://localhost:5173", "https://irobits.netlify.app"];

// Middleware
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors()); // For preflight requests
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
