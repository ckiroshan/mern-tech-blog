import mongoose from "mongoose";
import Post from "../models/Post.js";
import { uploadToS3 } from "./s3Service.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./db.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });
console.log("AWS Access Key:", process.env.AWS_ACCESS_KEY);
console.log("AWS Secret Key:", process.env.AWS_SECRET_KEY);

export const migrateToS3 = async () => {
  try {
    // Connect to database first
    await connectDB();

    console.log("Starting S3 migration...");

    // Increase timeout for the query
    const posts = await Post.find({ cover: { $exists: true } }).maxTimeMS(30000);

    console.log(`Found ${posts.length} posts to process`);

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const [index, post] of posts.entries()) {
      try {
        // Skip already migrated posts
        if (post.cover.startsWith("https://")) {
          skipCount++;
          continue;
        }

        // Correct path resolution
        const filePath = path.join(__dirname, "..", post.cover);
        console.log(`Looking for file at: ${filePath}`); // Debug log

        if (!fs.existsSync(filePath)) {
          console.warn(`[${index + 1}/${posts.length}] File missing: ${filePath}`);
          skipCount++;
          continue;
        }

        // Generate unique filename
        const fileExt = path.extname(filePath);
        const fileName = `migrated/${post._id}-${Date.now()}${fileExt}`;

        console.log(`[${index + 1}/${posts.length}] Migrating ${post._id}...`);
        const s3Url = await uploadToS3(filePath, fileName);

        // Update the post with new S3 URL
        await Post.findByIdAndUpdate(post._id, {
          cover: s3Url,
        });

        successCount++;
        console.log(`[${index + 1}/${posts.length}] Success: ${s3Url}`);
      } catch (err) {
        errorCount++;
        console.error(`[${index + 1}/${posts.length}] Error migrating post ${post._id}:`, err.message);
      }
    }

    console.log(`
      Migration complete:
      - Successfully migrated: ${successCount}
      - Skipped: ${skipCount}
      - Errors: ${errorCount}
    `);

    // Close connection when done
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    await mongoose.disconnect();
    process.exit(1);
  }
};

// Run the migration
migrateToS3();
