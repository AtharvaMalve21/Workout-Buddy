import React, { useEffect } from "react";
import { UseWorkoutsContext } from "../hooks/UseWorkoutsContext";
import axios from "axios";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = UseWorkoutsContext();

  const URI = "http://localhost:4000/api/workouts";

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(URI);
        const result = response.data.data;

        if (response.status === 200) {
          dispatch({ type: "SET_WORKOUTS", payload: result });
        }
      } catch (error) {
        console.error("Error fetching workouts:", error.message);
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout, index) => (
          <WorkoutDetails key={index} workout={workout} />
        ))}
        {!workouts && <p>Loading workouts...</p>}
      </div>
      <div>
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;
