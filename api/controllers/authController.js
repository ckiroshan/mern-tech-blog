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
  const userDoc = await User.findOne({ username }); // Gets username
  const passOk = bcrypt.compareSync(password, userDoc.password); // Checks password
  if (passOk) {
    // Logged In
    jwt.sign({ username, id: userDoc._id }, secretKey, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
        firstName: userDoc.firstName,
        lastName: userDoc.lastName,
        email: userDoc.email,
      });
    });
  } else {
    res.status(400).json("Wrong Credentials");
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
  });
};

// Log out
export const logout = (req, res) => {
  res.cookie("token", "").json("ok");
};
