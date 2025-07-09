import React, { useContext } from 'react'
import { WorkoutContext } from '../context/WorkoutContext.jsx'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { formatDistanceToNow } from 'date-fns'
import { Link } from "react-router-dom";

const Workout = () => {
  const { workouts } = useContext(WorkoutContext)
  const URI = import.meta.env.VITE_BACKEND_URI

  const deleteWorkout = async (id) => {
    try {
      const { data } = await axios.delete(`${URI}/api/v1/workouts/${id}`, {
        withCredentials: true,
      })
      if (data.success) toast.success(data.message)
    } catch (err) {
      toast.error(err.response?.data.message || 'Failed to delete workout')
    }
  }

  return (
    <div className="space-y-6">
      {workouts.length > 0 ? (
        workouts.map((workout) => (
          <div
            key={workout._id}
            className="w-full bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-blue-700 mb-1 truncate">
                  {workout.title}
                </h2>
                <p className="text-xs text-gray-500 mb-4">
                  {formatDistanceToNow(new Date(workout.createdAt), {
                    addSuffix: true,
                  })}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Load:</span> {workout.load} kg
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Reps:</span> {workout.reps}
                </p>
              </div>
              <div className='flex items-center justify-center gap-1'>
                <Link to={`/workouts/edit/${workout._id}`} className="text-yellow-600 hover:text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded p-1 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </Link>
                <button
                  onClick={() => deleteWorkout(workout._id)}
                  className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 rounded p-1 transition"
                  title="Delete workout"
                  aria-label={`Delete workout ${workout.title}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 6h18" />
                    <path d="M9 6v12" />
                    <path d="M15 6v12" />
                    <path d="M10 11h4" />
                    <path d="M5 6l1.5 12.5a2 2 0 0 0 2 1.5h7a2 2 0 0 0 2-1.5L19 6" />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        ))
      ) : (

        <p className="text-center text-gray-500 italic">No workouts logged so far. Let’s start your fitness journey!</p>

      )}
    </div>
  )
}

export default Workout
