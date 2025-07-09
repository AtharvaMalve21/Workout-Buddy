import express from "express";
const router = express.Router();

import {
  addWorkout,
  getUserWorkouts,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workout.controller.js";

import { isAuthenticated } from "../middleware/auth.middleware.js";

router.post("/add", isAuthenticated, addWorkout);

router.get("/", isAuthenticated, getUserWorkouts);

router.put("/:id/edit", isAuthenticated, updateWorkout);

router.delete("/:id", isAuthenticated, deleteWorkout);

export default router;
