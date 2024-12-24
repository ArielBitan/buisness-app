import express from "express";
import ReviewController from "../controllers/reviewController";

const router = express.Router();

// Create a new review
router.post("/", ReviewController.createReview);

// Get all reviews for a business
router.get("/:businessId", ReviewController.getReviewsByBusiness);

// Update a review
router.put("/:reviewId", ReviewController.updateReview);

// Delete a review
router.delete("/:reviewId", ReviewController.deleteReview);

export default router;
