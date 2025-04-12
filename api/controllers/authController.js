import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(10);
const secretKey = "jkhas!kd87&*2e#gjshghjsgd";

// Create User
export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
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
      });
    });
  } else {
    res.status(400).json("Wrong Credentials");
  }
};