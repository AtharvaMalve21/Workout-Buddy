import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const WorkoutForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    load: '',
    reps: '',
  })

  const URI = import.meta.env.VITE_BACKEND_URI

  const changeHandler = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addWorkout = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${URI}/api/v1/workouts/add`, formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      if (data.success) {
        toast.success(data.message)
        setFormData({ title: '', load: '', reps: '' })
      }
    } catch (err) {
      toast.error(err.response?.data.message || 'Something went wrong')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-md mx-auto lg:mx-0">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
        Log Your Workout Session
      </h2>
      <form onSubmit={addWorkout} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={changeHandler}
            placeholder="e.g. Deadlift"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 text-sm
                       transition duration-150 ease-in-out"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="load">
            Load (kg)
          </label>
          <input
            id="load"
            name="load"
            type="number"
            required
            value={formData.load}
            onChange={changeHandler}
            placeholder="e.g. 80"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 text-sm
                       transition duration-150 ease-in-out"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="reps">
            Reps
          </label>
          <input
            id="reps"
            name="reps"
            type="number"
            required
            value={formData.reps}
            onChange={changeHandler}
            placeholder="e.g. 10"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 text-sm
                       transition duration-150 ease-in-out"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700
                     transition duration-200 font-semibold focus:outline-none focus:ring-4
                     focus:ring-blue-400"
        >
          Add Workout
        </button>
      </form>
    </div>
  )
}

export default WorkoutForm
