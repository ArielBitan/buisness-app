import { Request, Response } from "express";
import * as reviewService from "../services/review.service"; // Adjust based on your actual file structure

export const createReview = async (req: Request, res: Response) => {
  try {
    const { businessId } = req.params;
    const { content } = req.body;
    const user = req.user.userId;

    if (!businessId || !content) {
      res.status(400).json({ error: "Business ID and content are required" });
      return;
    }
    const review = await reviewService.createReview({
      user,
      business: businessId,
      content,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ error: "Failed to create review" });
  }
};

export const checkReviewOwnership = async (req: Request, res: Response) => {
  const _id = req.user?.userId.toString();
  const { id } = req.params;
  const isSubscribed = await reviewService.isReviewOwner(_id, id);
  res.status(200).json(isSubscribed);
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
    const userId = req.user.userId;
    const deletedReview = await reviewService.deleteReview(reviewId, userId);

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
