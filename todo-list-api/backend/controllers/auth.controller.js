import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import Joi from "joi";

dotenv.config();

const signToken = (payload, key, expiresIn) => {
  return jwt.sign(payload, key, { expiresIn });
};

export const register = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    await schema.validateAsync(req.body);

    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.create({ name, email, password });
    const token = signToken(
      { ud: user._id, email },
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN
    );
    const refreshToken = signToken(
      { ud: user._id },
      process.env.REFRESH_SECRET,
      process.env.REFRESH_EXPIRES_IN
    );
    res.status(201).json({ token, refreshToken, user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    await schema.validateAsync(req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken(
      { id: user._id, email },
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN
    );
    const refreshToken = signToken(
      { id: user._id },
      process.env.REFRESH_SECRET,
      process.env.REFRESH_EXPIRES_IN
    );

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json({ token, refreshToken, user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const token = signToken(
      { id: decoded.id },
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN
    );
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

export const getMe = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).select("-password");

    res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};
