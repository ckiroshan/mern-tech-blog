import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(10);
const secretKey = "jkhas!kd87&*2e#gjshghjsgd";

// Create User
export const register = async (req, res) => {
  const { username, password, firstName, lastName, email } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
      firstName,
      lastName,
      email,
    });
    res.status(201).json(userDoc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login User
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username }); // Gets username
    if (!userDoc) return res.status(400).json("User not found");

    const passOk = bcrypt.compareSync(password, userDoc.password); // Checks password
    if (!passOk) return res.status(400).json("Wrong credentials");

    // Logged In
    const token = jwt.sign({ username, id: userDoc._id, isAdmin: userDoc.isAdmin }, secretKey, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: process.env.NODE_ENV === "production" ? ".irobits.netlify.app" : undefined,
      path: "/",
      maxAge: 86400000,
    });

    const userData = {
      id: userDoc._id,
      username,
      firstName: userDoc.firstName,
      lastName: userDoc.lastName,
      email: userDoc.email,
      isAdmin: userDoc.isAdmin,
      createdAt: userDoc.createdAt,
    };

    return res.json(userData);
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json("Server error");
  }
};

// Get User
export const profile = async (req, res) => {
  const { token } = req.cookies;
  // Return null if no token exists
  if (!token) {
    return res.status(200).json(null);
  }
  const decoded = jwt.verify(token, secretKey);
  const userDoc = await User.findById(decoded.id).select("-password -__v"); // Exclude sensitive fields
  res.json({
    id: userDoc._id,
    username: userDoc.username,
    firstName: userDoc.firstName,
    lastName: userDoc.lastName,
    email: userDoc.email,
    isAdmin: userDoc.isAdmin,
    createdAt: userDoc.createdAt,
    updatedAt: userDoc.updatedAt,
  });
};

// Update User
export const modifyUser = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json("Not authenticated");
  }

  const decoded = jwt.verify(token, secretKey);
  const { firstName, lastName, password } = req.body;
  const updateData = {};

  if (firstName !== undefined) updateData.firstName = firstName;
  if (lastName !== undefined) updateData.lastName = lastName;
  if (password !== undefined) {
    updateData.password = bcrypt.hashSync(password, salt);
  }

  // Update the user
  const updatedUser = await User.findByIdAndUpdate(decoded.id, updateData, { new: true, runValidators: true }).select("-password -__v");

  if (!updatedUser) {
    return res.status(404).json("User not found");
  }

  // Return updated user data
  res.json({
    id: updatedUser._id,
    username: updatedUser.username,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    email: updatedUser.email,
    createdAt: updatedUser.createdAt,
    updatedAt: userDoc.updatedAt,
  });
};

// Log out
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    domain: process.env.NODE_ENV === "production" ? ".irobits.netlify.app" : undefined,
    path: "/",
  });
  return res.json("ok");
};

// Validate if User is Admin
export const isAdmin = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json("Not authenticated");
  jwt.verify(token, secretKey, {}, (err, info) => {
    if (err) return res.status(403).json("Invalid token");
    if (!info.isAdmin) return res.status(403).json("Admin access required");
    req.user = { id: info.id, isAdmin: info.isAdmin };
    next();
  });
};
