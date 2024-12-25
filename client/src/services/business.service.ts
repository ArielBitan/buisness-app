import api from "@/lib/api";
import { IBusiness } from "@/types/business.type";

// Function to fetch all businesses
export const fetchAllBusinesses = async (
  limit?: number
): Promise<IBusiness[]> => {
  try {
    const { data } = await api.get<IBusiness[]>(`/businesses?limit=${limit}`);
    return data;
  } catch (error) {
    console.error("Error fetching businesses:", error);
    throw error;
  }
};

// Function to fetch a single business by ID
export const fetchBusinessById = async (
  businessId: string
): Promise<IBusiness> => {
  try {
    const { data } = await api.get<IBusiness>(`/businesses/${businessId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching business with ID ${businessId}:`, error);
    throw error;
  }
};

// Function to create a new business
export const createBusiness = async (
  businessData: Omit<IBusiness, "_id" | "createdAt" | "updatedAt">
): Promise<IBusiness> => {
  try {
    console.log(businessData);
    const { data } = await api.post<IBusiness>("/businesses", businessData);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error creating business:", error);
    throw error;
  }
};

// Function to update an existing business
export const updateBusiness = async (
  businessId: string,
  updatedData: Partial<IBusiness>
): Promise<IBusiness> => {
  try {
    const { data } = await api.put<IBusiness>(
      `/businesses/${businessId}`,
      updatedData
    );
    return data;
  } catch (error) {
    console.error(`Error updating business with ID ${businessId}:`, error);
    throw error;
  }
};

// Function to delete a business
export const deleteBusiness = async (businessId: string): Promise<void> => {
  try {
    await api.delete(`/businesses/${businessId}`);
  } catch (error) {
    console.error(`Error deleting business with ID ${businessId}:`, error);
    throw error;
  }
};
