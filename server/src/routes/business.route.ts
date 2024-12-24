import express from "express";
import * as businessController from "../controllers/business.controller";
import { authenticateUser } from "../middleware/authMiddleware";
import { checkBusinessOwner } from "../middleware/authorizationMiddleware";

const router = express.Router();

// Get businesses
router.get("/businesses", businessController.getBusinesses);

// Create business (authenticated)
router.post("/businesses", authenticateUser, businessController.createBusiness);

// Route to update business by ID (authenticated, owner only)
router.put(
  "/businesses/:id",
  authenticateUser,
  checkBusinessOwner,
  businessController.updateBusiness
);

// Route to delete business by ID (authenticated, owner only)
router.delete(
  "/businesses/:id",
  authenticateUser,
  checkBusinessOwner,
  businessController.deleteBusiness
);

export default router;
