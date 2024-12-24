import Review from "../models/review.model";
import { I_ReviewSchema } from "../types/review.types";
import { Types } from "mongoose";

export default class ReviewService {
  // Create a new review
  static async createReview(
    data: Partial<I_ReviewSchema>
  ): Promise<I_ReviewSchema> {
    const review = await Review.create(data);
    return review;
  }

  // Get all reviews for a specific business
  static async getReviewsByBusiness(
    businessId: string
  ): Promise<I_ReviewSchema[]> {
    return await Review.find({ business: businessId }).populate(
      "user",
      "name email"
    );
  }

  // Update a review
  static async updateReview(
    reviewId: string,
    content: string
  ): Promise<I_ReviewSchema | null> {
    return await Review.findByIdAndUpdate(reviewId, { content }, { new: true });
  }

  // Delete a review
  static async deleteReview(reviewId: string): Promise<I_ReviewSchema | null> {
    return await Review.findByIdAndDelete(reviewId);
  }
}
