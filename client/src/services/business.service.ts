import api from "@/lib/api";
import { IBusiness, IReview, ISubscription } from "@/types/business.type";

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
    const { data } = await api.post<IBusiness>("/businesses", businessData);
    return data;
  } catch (error) {
    console.error("Error creating business:", error);
    throw error;
  }
};

export const fetchBusinessReviews = async (
  businessId: string
): Promise<IReview[]> => {
  try {
    const { data } = await api.get<IReview[]>(`/reviews/${businessId}`);
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
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

// Function to subscribe to a business
export const subscribeToBusiness = async (
  businessId: string
): Promise<ISubscription> => {
  try {
    const { data } = await api.post<ISubscription>(
      `/businesses/subscription/${businessId}`
    );
    return data;
  } catch (error) {
    console.error(
      `Error subscribing to business with ID ${businessId}:`,
      error
    );
    throw error;
  }
};

// Function to fetch all subscriptions for the current user
export const fetchUserSubscriptions = async (): Promise<ISubscription[]> => {
  try {
    const { data } = await api.get<ISubscription[]>("/businesses/subscription");
    return data;
  } catch (error) {
    console.error("Error fetching user subscriptions:", error);
    throw error;
  }
};
