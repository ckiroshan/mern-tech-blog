import Post from "../models/Post.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
const secretKey = "jkhas!kd87&*2e#gjshghjsgd";

export const getAdminStats = async (req, res) => {
  try {
    const [totalUsers, totalPosts, pendingPosts] = await Promise.all([User.countDocuments(), Post.countDocuments(), Post.countDocuments({ isApproved: false })]);

    res.json({ totalUsers, totalPosts, pendingPosts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -__v").lean();

    // Add post count for each user
    const usersWithPostCount = await Promise.all(
      users.map(async (user) => {
        const postCount = await Post.countDocuments({ author: user._id });
        return { ...user, postCount };
      })
    );

    res.json(usersWithPostCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPendingPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isApproved: false }).populate("author", "username firstName lastName").sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const approvePostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.postId, { isApproved: true }, { new: true });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePostById = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    // First delete all posts by this user
    const postsDeleted = await Post.deleteMany({ author: req.params.userId });

    // Then delete the user
    await User.findByIdAndDelete(req.params.userId);

    res.json({
      success: true,
      postsDeleted: postsDeleted.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password -__v");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password, isAdmin } = req.body;
    const updateData = { firstName, lastName, email, username, isAdmin };

    // Only update password if provided
    if (password) {
      updateData.password = bcrypt.hashSync(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.userId, updateData, { new: true, runValidators: true }).select("-password -__v");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
