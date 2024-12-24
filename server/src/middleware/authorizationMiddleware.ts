import { Request, Response, NextFunction } from "express";
import Business from "../models/business.model";

export const checkBusinessOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const business = await Business.findById(id);
  if (!business) {
    res.status(404).json({ error: "Business not found" });
    return;
  }

  if (business.owner.toString() !== userId.toString()) {
    res
      .status(403)
      .json({ error: "You are not authorized to perform this action" });
    return;
  }

  next();
};
