import { Request, Response } from "express";
import * as userService from "../services/user.service";

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
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
