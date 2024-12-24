import { Request, Response } from "express";
import ReviewService from "../services/review.service";

export default class ReviewController {
  // Create a new review
  static async createReview(req: Request, res: Response): Promise<void> {
    try {
      const { user, business, content } = req.body;
      const review = await ReviewService.createReview({
        user,
        business,
        content,
      });
      res.status(201).json(review);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create review", error: error.message });
    }
  }

  // Get all reviews for a business
  static async getReviewsByBusiness(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { businessId } = req.params;
      const reviews = await ReviewService.getReviewsByBusiness(businessId);
      res.status(200).json(reviews);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch reviews", error: error.message });
    }
  }

  // Update a review
  static async updateReview(req: Request, res: Response): Promise<void> {
    try {
      const { reviewId } = req.params;
      const { content } = req.body;
      const updatedReview = await ReviewService.updateReview(reviewId, content);

      if (!updatedReview) {
        res.status(404).json({ message: "Review not found" });
      } else {
        res.status(200).json(updatedReview);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update review", error: error.message });
    }
  }

  // Delete a review
  static async deleteReview(req: Request, res: Response): Promise<void> {
    try {
      const { reviewId } = req.params;
      const deletedReview = await ReviewService.deleteReview(reviewId);

      if (!deletedReview) {
        res.status(404).json({ message: "Review not found" });
      } else {
        res.status(200).json({ message: "Review deleted successfully" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete review", error: error.message });
    }
  }
}
