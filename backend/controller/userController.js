import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullname, phone, email, password: hashedPassword });
    await user.save();
    res
      .status(201)
      .json({ message: "User registered successfully", data: user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "No user found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
