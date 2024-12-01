// import React from "react";

// const WorkoutForm = ({
//   title,
//   reps,
//   load,
//   changeHandler,
//   addWorkout,
//   error,
// }) => {
//   return (
//     <form className="create">
//       <h3>Add a New Workout</h3>

//       <label htmlFor="title">Exercise Title:</label>
//       <input
//         type="text"
//         name="title"
//         id="title"
//         value={title}
//         onChange={changeHandler}
//       />

//       <label htmlFor="load">Load (in Kg):</label>
//       <input
//         type="number"
//         name="load"
//         id="load"
//         value={load}
//         onChange={changeHandler}
//       />

//       <label htmlFor="reps">Reps:</label>
//       <input
//         type="number"
//         name="reps"
//         id="reps"
//         value={reps}
//         onChange={changeHandler}
//       />

//       <button type="submit" onClick={addWorkout}>
//         Add Workout
//       </button>
//       {error && <div className="error">{error}</div>}
//     </form>
//   );
// };

// export default WorkoutForm;

import { useContext, useState } from "react";
import axios from "axios";
import { UseWorkoutsContext } from "../hooks/UseWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = UseWorkoutsContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const URI = "http://localhost:4000/api/workouts";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    try {
      const response = await axios.post(URI, workout, {
        headers: { "Content-Type": "application/json" },
      });

      const result = response.data.data;

      // Validation: Check for empty fields
      if (!title || !load || !reps) {
        setError("All fields are required!");
        setEmptyFields(result.emptyFields);
        return;
      }

      //Reset from fields and error state
      setError(null);
      setEmptyFields([]);
      setTitle("");
      setLoad("");
      setReps("");
      console.log("new workout added:", result);
      dispatch({ type: "CREATE_WORKOUT", payload: result });
    } catch (err) {
      // Handle errors (e.g., network issues or validation errors)
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
