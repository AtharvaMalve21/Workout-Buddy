import User from "../models/user.model.js";
import Workout from "../models/workout.model.js";



export const addWorkout = async (req, res) => {
  try {
    //authenticate the user
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    //fetch workout details
    const { title, reps, load } = req.body;

    //validate details
    if (!title || !reps || !load) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    //create new workout
    const workout = await Workout.create({
      owner: userId,
      title: title,
      reps: reps,
      load: load,
    });

    return res.status(201).json({
      success: true,
      data: workout,
      message: "New Workout added",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getUserWorkouts = async (req, res) => {
  try {
    //authenticate user
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User found.",
      });
    }

    const workouts = await Workout.find({ owner: userId });

    return res.status(200).json({
      success: true,
      data: workouts,
      message: "Workouts data fetched.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateWorkout = async (req, res) => {
  try {
    //authenticate user
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User found.",
      });
    }

    const { id: workoutId } = req.params;

    const workout = await Workout.findById(workoutId);

    if (!workout) {
      return res.status(400).json({
        success: false,
        message: "No Workout found.",
      });
    }

    //check if the user is authorized to update this workout

    if (workout.owner.toString() !== userId.toString()) {
      return res.status(401).json({
        success: false,
        message: "User is not authorized to update this workout.",
      });
    }

    //fetch the workout details
    const { title, load, reps } = req.body;

    workout.title = title || workout.title;
    workout.load = load || workout.load;
    workout.reps = reps || workout.reps;

    await workout.save();

    return res.status(200).json({
      success: true,
      data: workout,
      message: "Workout updated successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteWorkout = async (req, res) => {
  try {
    //authenticate user
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User found.",
      });
    }

    const { id: workoutId } = req.params;

    const workout = await Workout.findById(workoutId);

    if (!workout) {
      return res.status(400).json({
        success: false,
        message: "Workout not found.",
      });
    }

    //check if the user is authorized to delete this workout
    if (workout.owner.toString() !== userId.toString()) {
      return res.status(401).json({
        success: false,
        message: "User is not authorized to delete this workout.",
      });
    }

    await workout.deleteOne({ id: workoutId });

    return res.status(200).json({
      success: true,
      message: "Workout deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
