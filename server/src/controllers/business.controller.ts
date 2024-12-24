import { Request, Response } from "express";
import * as businessService from "../services/business.service";

// Get businesses with optional filters
export const getBusinesses = async (req: Request, res: Response) => {
  try {
    const filter = req.query;
    const businesses = await businessService.getBusinesses(filter);
    res.status(200).json(businesses);
  } catch (err) {
    res.status(500).json({ error: "Failed to get businesses" });
  }
};

// Create a new business (authenticated, owner only)
export const createBusiness = async (req: Request, res: Response) => {
  try {
    const { name, description, category } = req.body;
    const owner = req.user.userId;
    console.log(req.user);
    const newBusiness = await businessService.createBusiness(
      name,
      description,
      category,
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
