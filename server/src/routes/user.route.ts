import express from "express";
import * as userController from "../controllers/user.controller";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:id", userController.getUserById);

router.get("/:id/saved-businesses", userController.getSavedBusinesses);

router.get("/:id/businesses", userController.getUserBusinesses);

// POST /auth/signup
router.post("/auth/signup", userController.signup);

// POST /auth/login
router.post("/auth/login", userController.login);

// POST /auth/logout
router.post("/auth/logout", userController.logout);

router.put("/", authenticateUser, userController.updateUserDetails);

export default router;
