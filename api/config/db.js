import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

// Configure Mongoose
mongoose.set("strictQuery", false);
mongoose.set("autoIndex", true);

// Connection management
let isConnected = false;
let connectionPromise;

const connect = async () => {
  if (isConnected) return mongoose.connection;
  if (connectionPromise) return await connectionPromise;

  try {
    connectionPromise = mongoose.connect(process.env.ATLAS_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
    });

    const connection = await connectionPromise;
    isConnected = true;
    console.log("MongoDB connected successfully");
    return connection;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

// Middleware factory
const connectionMiddleware = () => async (req, res, next) => {
  try {
    await connect();
    next();
  } catch (error) {
    res.status(503).json({ error: "Database unavailable" });
  }
};

// Test endpoint handler
const testConnectionHandler = async (req, res) => {
  try {
    await connect();
    await mongoose.connection.db.admin().ping();
    res.json({
      status: "OK",
      dbState: mongoose.connection.readyState,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      connectionState: mongoose.connection.readyState,
    });
  }
};

export default {
  connect,
  connection: mongoose.connection,
  connectionMiddleware,
  testConnectionHandler,
};
