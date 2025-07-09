import { useContext, useEffect } from 'react'
import axios from 'axios'
import { WorkoutContext } from '../context/WorkoutContext.jsx'
import Workout from '../components/Workout.jsx'
import WorkoutForm from '../components/WorkoutForm.jsx'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { workouts, setWorkouts } = useContext(WorkoutContext)
  const URI = import.meta.env.VITE_BACKEND_URI
  const navigate = useNavigate()

  const fetchWorkouts = async () => {
    try {
      const { data } = await axios.get(`${URI}/api/v1/workouts`, {
        withCredentials: true,
      })
      if (data.success) {
        setWorkouts(data.data)
      }
    } catch (err) {
      console.log(err.response?.data.message);
      navigate('/login')
    }
  }

  useEffect(() => {
    fetchWorkouts()
  }, [workouts])

  return (
    <section className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-10">
        {/* Workout List - 2/3 width on large screens */}
        <div className="w-full lg:w-2/3 space-y-6">
          <Workout />
        </div>

        {/* Workout Form - 1/3 width on large screens */}
        <div className="w-full lg:w-1/3">
          <WorkoutForm />
        </div>
      </div>
    </section>
  )
}

export default Home
