import User from "../models/User.js";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

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
