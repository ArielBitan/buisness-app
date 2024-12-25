import express from "express";
import * as businessController from "../controllers/business.controller";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

// Get businesses
router.get("/", businessController.getBusinesses);

router.get("/:id", businessController.getBusinessById);

// Create business (authenticated)
router.post("/", authenticateUser, businessController.createBusiness);

router.get(
  "/:id/is-owner",
  authenticateUser,
  businessController.checkBusinessOwnership
);

// Route to update business by ID (authenticated, owner only)
router.put("/:id", authenticateUser, businessController.updateBusiness);

// Route to delete business by ID (authenticated, owner only)
router.delete("/:id", authenticateUser, businessController.deleteBusiness);

export default router;
