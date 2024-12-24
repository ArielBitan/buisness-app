import Business from "../models/business.model";
import { I_BusinessDocument } from "../types/business.types";

// Get businesses with optional filters
export const getBusinesses = async (filter: Record<string, any>) => {
  try {
    return await Business.find(filter);
  } catch (err) {
    throw new Error("Failed to get businesses");
  }
};

// Create a new business
export const createBusiness = async (
  name: string,
  description: string,
  category: string,
  owner: string
) => {
  try {
    const newBusiness = await Business.create({
      name,
      description,
      category,
      owner,
    });
    return newBusiness;
  } catch (err) {
    throw new Error("Failed to create business");
  }
};

// Update business by ID
export const updateBusiness = async (
  id: string,
  updatedData: Partial<I_BusinessDocument>
) => {
  try {
    const updatedBusiness = await Business.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedBusiness) {
      throw new Error("Business not found");
    }
    return updatedBusiness;
  } catch (err) {
    throw new Error("Failed to update business");
  }
};

// Delete business by ID
export const deleteBusiness = async (id: string) => {
  try {
    const deletedBusiness = await Business.findByIdAndDelete(id);
    if (!deletedBusiness) {
      throw new Error("Business not found");
    }
    return deletedBusiness;
  } catch (err) {
    throw new Error("Failed to delete business");
  }
};
