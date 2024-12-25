import { ISubscription } from "@/types/business.type";
import api from "@/lib/api";

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

export const checkSubscriptionStatus = async (
  businessId: string
): Promise<boolean> => {
  const { data } = await api.get(
    `/businesses/${businessId}/subscription-status`
  );

  return data;
};

// Function to subscribe to a business
export const subscribeToBusiness = async (
  businessId: string
): Promise<ISubscription> => {
  try {
    const { data } = await api.post<ISubscription>(
      `/businesses/${businessId}/subscribe`
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
