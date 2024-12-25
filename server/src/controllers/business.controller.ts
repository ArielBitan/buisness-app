import { Request, Response } from "express";
import * as businessService from "../services/business.service";
import Business from "../models/business.model";
import User from "../models/user.model";
import { PLAN_LIMITS } from "../types/user.types";

// Get businesses with optional filters
export const getBusinesses = async (req: Request, res: Response) => {
  try {
    const { filter = "", limit = "10", category = "" } = req.query;
    const parsedLimit = Math.min(Math.max(parseInt(limit as string), 1), 100);
    const filterObj: Record<string, any> = {};

    if (filter) {
      filterObj.name = { $regex: filter, $options: "i" };
    }

    if (category) {
      filterObj.category = category;
    }

    const businesses = await businessService.getBusinesses(
      filterObj,
      parsedLimit
    );

    res.status(200).json(businesses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get businesses" });
  }
};

export const getBusinessById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const business = await Business.findById(id);
    if (!business) {
      res.status(404).json({ error: "Business not found" });
      return;
    }
    res.status(201).json(business);
  } catch (error) {
    res.status(500).json({ error: "Failed to get business" });
  }
};

export const checkBusinessOwnership = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const isOwner = await businessService.checkBusinessOwnerService(id, userId);

    if (!isOwner) {
      res.status(403).json({
        error: "You are not authorized to perform this action",
      });
      return;
    }

    res.status(200).json({ message: "You own this business" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while checking ownership" });
  }
};

// Create a new business (authenticated, owner only)
export const createBusiness = async (req: Request, res: Response) => {
  try {
    const { name, description, category, image } = req.body;
    console.log(req.body);
    const owner = req.user._id;
    const user = await User.findById(owner);

    const businessCount = await Business.countDocuments({ owner });
    const planLimit = PLAN_LIMITS[user.plan];

    if (businessCount >= planLimit) {
      res.status(403).json({
        message: `Limit reached. Your plan (${user.plan}) allows only ${planLimit} businesses.`,
      });
      return;
    }

    const newBusiness = await businessService.createBusiness(
      name,
      description,
      category,
      image,
      owner
    );
    res.status(201).json(newBusiness);
  } catch (err) {
    res.status(500).json({ error: "Failed to create business" });
  }
};

// Update business (authenticated, owner only)
export const updateBusiness = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedBusiness = await businessService.updateBusiness(id, req.body);
    res.status(200).json(updatedBusiness);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete business (authenticated, owner only)
export const deleteBusiness = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedBusiness = await businessService.deleteBusiness(id);
    res.status(200).json({ message: "Business deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
