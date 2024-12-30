import api from "@/lib/api";
import { IReview } from "@/types/business.type";

export const postReview = async ({
  businessId,
  content,
}: {
  businessId: string;
  content: string;
}): Promise<void> => {
  try {
    const response = await api.post(`/reviews/${businessId}`, {
      content,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to post review");
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

export const checkReviewOwnership = async (
  reviewId: string
): Promise<boolean> => {
  const { data } = await api.get(`/reviews/${reviewId}/is-owner`);
  return data;
};

export const deleteReview = async (reviewId: string): Promise<void> => {
  await api.delete(`/reviews/${reviewId}`);
};
