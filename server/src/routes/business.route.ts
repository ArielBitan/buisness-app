import express from "express";
import * as businessController from "../controllers/business.controller";
import { authenticateUser } from "../middleware/authMiddleware";
import { checkBusinessOwner } from "../middleware/authorizationMiddleware";

const router = express.Router();

// Get businesses
router.get("/", businessController.getBusinesses);

router.get("/:id", businessController.getBusinessById);

// Create business (authenticated)
router.post("/", authenticateUser, businessController.createBusiness);

// Route to update business by ID (authenticated, owner only)
router.put(
  "/:id",
  authenticateUser,
  checkBusinessOwner,
  businessController.updateBusiness
);

// Route to delete business by ID (authenticated, owner only)
router.delete(
  "/:id",
  authenticateUser,
  checkBusinessOwner,
  businessController.deleteBusiness
);

export default router;
