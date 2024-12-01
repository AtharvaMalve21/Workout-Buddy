const Workout = require("../models/workout");

//POST a workout

exports.createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push(title);
  }
  if (!load) {
    emptyFields.push(load);
  }
  if (!reps) {
    emptyFields.push(reps);
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all the fields",
      emptyFields,
    });
  }

  try {
    const response = await Workout.create({ title, reps, load });

    res.status(200).json({
      success: true,
      data: response,
      message: "New entry created!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error",
    });
  }
};

//GET all workouts

exports.findAllWorkouts = async (req, res) => {
  try {
    const response = await Workout.find({});

    res.status(200).json({
      success: true,
      data: response,
      message: "Here are your listed data",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error",
    });
  }
};

//GET a workout by id

exports.viewWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Workout.findById(id);

    res.status(200).json({
      success: true,
      data: response,
      message: `Data found having ${id}`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error",
    });
  }
};

//Update a workout

exports.updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, reps, load } = req.body;

    const response = await Workout.findByIdAndUpdate(
      id,
      { title, reps, load },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: response,
      message: "Data successfully updated!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error",
    });
  }
};

//Delete a workout

exports.deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Workout.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      data: response,
      message: "Data successfully deleted!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error",
    });
  }
};
