import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

// Fix Mongoose deprecation warning
mongoose.set("strictQuery", false);
mongoose.set("autoIndex", true);

const connectDB = async () => {
  try {
    const uri = process.env.ATLAS_URI;
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
