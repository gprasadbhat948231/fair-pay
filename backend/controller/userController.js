import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullname, phone, email, password:hashedPassword });
    // await user.save();
    res.status(201).json({ message: "User registered successfully", data: user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
