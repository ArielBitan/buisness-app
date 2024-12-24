import { I_UserWithoutPassword } from "../types/user.types";
import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import * as cookie from "cookie";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = cookie.parse(req.headers.cookie as string);
    const token = cookies.jwt;

    if (!token) {
      res
        .status(401)
        .json({ message: "Session expired. Please log in again." });
      return;
    }

    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as Secret
    ) as I_UserWithoutPassword;
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
