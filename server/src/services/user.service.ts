import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import Business from "../models/business.model";

// Signup Service
export const signupUser = async (
  email: string,
  name: string,
  password: string,
  plan: "Standard" | "Gold" | "Platinum"
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const newUser = new User({
    email,
    name,
    password,
    plan,
  });

  await newUser.save();
  return newUser;
};

// Login Service
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const businessCount = await Business.countDocuments({ owner: user._id });
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Generate a JWT token
  const token = jwt.sign(
    {
      email,
      _id: user._id,
      plan: user.plan,
      businessCount,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, user };
};

export const logoutUser = async () => {};
