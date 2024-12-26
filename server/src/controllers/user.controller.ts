import { Request, Response } from "express";
import * as userService from "../services/user.service";

// Get user by id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserDetails(id);
    console.log(user);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

// get user saved Businesses
export const getSavedBusinesses = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const businesses = await userService.getUserSavedBusinesses(id);
    if (!businesses) {
      res.status(404).json({ message: "no businesses found" });
    }
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
// get user  businesses
export const getUserBusinesses = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const businesses = await userService.getUserBusinesses(id);
    if (!businesses) {
      res.status(404).json({ message: "no businesses found" });
    }
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

// User Signup
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, name, password, plan } = req.body;
    const newUser = await userService.signupUser(email, name, password, plan);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await userService.loginUser(email, password);
    res
      .cookie("jwt", token, {
        httpOnly: false,
        secure: false,
        sameSite: "strict",
        maxAge: 3600000,
      })
      .status(200)
      .json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// User Logout
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: false,
      secure: false,
      sameSite: "strict",
    });

    // Respond with a success message
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
