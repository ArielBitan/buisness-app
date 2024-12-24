import express from "express";
import * as userController from "../controllers/user.controller";

const router = express.Router();

// POST /auth/signup
router.post("/auth/signup", userController.signup);

// POST /auth/login
router.post("/auth/login", userController.login);

// POST /auth/logout
router.post("/auth/logout", userController.logout);

export default router;
