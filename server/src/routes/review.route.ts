import express from "express";
import * as reviewController from "../controllers/review.controller";

const router = express.Router();

// Create a new review
router.post("/", reviewController.createReview);

// Get all reviews for a business
router.get("/:businessId", reviewController.getReviewsByBusiness);

// Update a review
router.put("/:reviewId", reviewController.updateReview);

// Delete a review
router.delete("/:reviewId", reviewController.deleteReview);

export default router;
