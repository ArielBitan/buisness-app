// subscription.router.ts

import express from "express";
import * as subscriptionController from "../controllers/subscription.controller";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

// POST /businesses/:id/subscribe - toggle subscription
router.post(
  "/:id/subscribe",
  authenticateUser,
  subscriptionController.toggleSubscription
);

// GET /businesses/:id/subscribers - Get all subscribers of a business
router.get(
  "/:id/subscribers",
  authenticateUser,
  subscriptionController.getSubscribers
);

// Get - check if user is subscribed to post
router.get(
  "/:id/subscription-status",
  authenticateUser,
  subscriptionController.checkSubscription
);

export default router;
