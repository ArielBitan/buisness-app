// subscription.router.ts

import express from "express";
import * as subscriptionController from "../controllers/subscription.controller";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

// POST /businesses/:id/subscribe - Subscribe to a business
router.post(
  "/:id/subscribe",
  authenticateUser,
  subscriptionController.subscribe
);

// DELETE /businesses/:id/unsubscribe - Unsubscribe from a business
router.delete(
  "/:id/unsubscribe",
  authenticateUser,
  subscriptionController.unsubscribe
);

// GET /businesses/:id/subscribers - Get all subscribers of a business
router.get(
  "/:id/subscribers",
  authenticateUser,
  subscriptionController.getSubscribers
);

export default router;
