import Review from "../models/review.model";
import { I_ReviewSchema } from "../types/review.types";

// Create a new review
export const createReview = async (data: {
  user: string;
  business: string;
  content: string;
}): Promise<I_ReviewSchema> => {
  try {
    const review = await Review.create(data);
    return review;
  } catch (err) {
    throw new Error("Failed to create review");
  }
};

// Get all reviews for a specific business
export const getReviewsByBusiness = async (
  businessId: string
): Promise<I_ReviewSchema[]> => {
  try {
    const reviews = await Review.find({ business: businessId })
      .populate("user", "name email profilePic")
      .sort({ createdAt: -1 });
    return reviews;
  } catch (err) {
    throw new Error("Failed to get reviews");
  }
};

// Update a review
export const updateReview = async (
  reviewId: string,
  updatedData: Partial<I_ReviewSchema>
): Promise<I_ReviewSchema | null> => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      updatedData,
      {
        new: true,
      }
    );
    if (!updatedReview) {
      throw new Error("Review not found");
    }
    return updatedReview;
  } catch (err) {
    throw new Error("Failed to update review");
  }
};

// Delete a review
export const deleteReview = async (
  reviewId: string
): Promise<I_ReviewSchema | null> => {
  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      throw new Error("Review not found");
    }
    return deletedReview;
  } catch (err) {
    throw new Error("Failed to delete review");
  }
};
