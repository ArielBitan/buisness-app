import { Request, Response } from "express";
import * as reviewService from "../services/review.service";

// Create a new review
export const createReview = async (req: Request, res: Response) => {
  try {
    const { user, business, content } = req.body;
    const review = await reviewService.createReview({
      user,
      business,
      content,
    });
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create review" });
  }
};

// Get all reviews for a specific business
export const getReviewsByBusiness = async (req: Request, res: Response) => {
  try {
    const { businessId } = req.params;
    const reviews = await reviewService.getReviewsByBusiness(businessId);
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get reviews" });
  }
};

// Update a review
export const updateReview = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    const { content } = req.body;
    const updatedReview = await reviewService.updateReview(reviewId, {
      content,
    });

    if (!updatedReview) {
      res.status(404).json({ error: "Review not found" });
      return;
    }

    res.status(200).json(updatedReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update review" });
  }
};

// Delete a review
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    const deletedReview = await reviewService.deleteReview(reviewId);

    if (!deletedReview) {
      res.status(404).json({ error: "Review not found" });
      return;
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete review" });
  }
};
