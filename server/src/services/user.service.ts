import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

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

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Generate a JWT token
  const token = jwt.sign(
    {
      email,
      userId: user._id,
      plan: user.plan,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

export const logoutUser = async () => {};
