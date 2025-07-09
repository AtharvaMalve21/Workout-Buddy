import express from "express";
const router = express.Router();

import {
  signup,
  login,
  logout,
  getUserProfile,
} from "../controllers/user.controller.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";

router.post("/signup", signup);

router.post("/login", login);

router.get("/logout", isAuthenticated, logout);

router.get("/profile", isAuthenticated, getUserProfile);

export default router;
