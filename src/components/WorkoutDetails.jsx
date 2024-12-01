import React from "react";
import axios from "axios";
import { UseWorkoutsContext } from "../hooks/UseWorkoutsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const URI = "http://localhost:4000/api/workouts/";

  const { dispatch } = UseWorkoutsContext();

  const handleClick = async () => {
    try {
      const response = await axios.delete(URI + workout._id);

      // Check if the deletion was successful (status code 200)
      if (response.status === 200) {
        dispatch({ type: "DELETE_WORKOUT", payload: workout._id });
      } else {
        console.error("Failed to delete the workout");
      }
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (Kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  );
};

export default WorkoutDetails;
