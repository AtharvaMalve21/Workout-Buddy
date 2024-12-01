const express = require("express");
const router = express.Router();

const {
  createWorkout,
  findAllWorkouts,
  viewWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

router.post("/", createWorkout);

router.get("/", findAllWorkouts);

router.get("/:id", viewWorkout);

router.put("/:id", updateWorkout);

router.delete("/:id", deleteWorkout);

module.exports = router;
