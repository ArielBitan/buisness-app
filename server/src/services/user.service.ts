import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import Business from "../models/business.model";
import Subscriber from "../models/subscriber.model";

// Get user by id service
export const getUserDetails = async (id: string) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User doesnt exist");
    }
    const businessCount = await Business.countDocuments({ owner: user._id });
    const userWithBusinessCount = { ...user.toObject(), businessCount };
    return userWithBusinessCount;
  } catch (error) {
    throw new Error(error);
  }
};

// Get user saved businesses
export const getUserSavedBusinesses = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User doesnt exist");
    }
    const subscriptions = await Subscriber.find({ user: id });
    const savedBusinesses = await Promise.all(
      subscriptions.map(
        async (subscription) => await Business.findById(subscription.business)
      )
    );
    return savedBusinesses;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserBusinesses = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User doesnt exist");
    }
    const businesses = await Business.find({ owner: id });
    return businesses;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUserDetails = async (
  id: string,
  name: string,
  email: string,
  profilePic: string
) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { name, email, profilePic }
    );
    if (!user) {
      throw new Error("User doesn't exist");
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

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
      profilePic: user.profilePic,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, user };
};
