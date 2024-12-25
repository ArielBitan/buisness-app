import express from "express";
import * as reviewController from "../controllers/review.controller";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

// Create a new review
router.post("/:businessId", authenticateUser, reviewController.createReview);

// Get all reviews for a business
router.get("/:businessId", reviewController.getReviewsByBusiness);

// Update a review
router.put("/:reviewId", authenticateUser, reviewController.updateReview);

// Delete a review
router.delete("/:reviewId", authenticateUser, reviewController.deleteReview);

router.get(
  "/:id/is-owner",
  authenticateUser,
  reviewController.checkReviewOwnership
);

export default router;
