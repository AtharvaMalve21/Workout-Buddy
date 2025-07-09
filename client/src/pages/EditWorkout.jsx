import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WorkoutContext } from '../context/WorkoutContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const EditWorkout = () => {
    const { id } = useParams();
    const { workouts } = useContext(WorkoutContext);

    const [formData, setFormData] = useState({
        title: '',
        load: '',
        reps: '',
    });

    const URI = import.meta.env.VITE_BACKEND_URI;
    const navigate = useNavigate();
    
    useEffect(() => {
        const workout = workouts.find((w) => w._id === id);
        if (workout) {
            setFormData({
                title: workout.title,
                load: workout.load,
                reps: workout.reps,
            });
        }
    }, [id, workouts]);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const editWorkout = async (ev) => {
        ev.preventDefault();
        try {
            const { data } = await axios.put(`${URI}/api/v1/workouts/${id}/edit`, formData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            if (data.success) {
                toast.success(data.message);
                navigate('/');
            }
        } catch (err) {
            toast.error(err.response?.data.message || 'Something went wrong');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
                    Edit Workout
                </h2>

                <form onSubmit={editWorkout} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            value={formData.title}
                            onChange={changeHandler}
                            placeholder="Enter workout title"
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* Load */}
                    <div>
                        <label htmlFor="load" className="block mb-2 font-medium text-gray-700">
                            Load (kg)
                        </label>
                        <input
                            id="load"
                            name="load"
                            type="number"
                            required
                            value={formData.load}
                            onChange={changeHandler}
                            placeholder="Enter load in kg"
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            min="0"
                        />
                    </div>

                    {/* Reps */}
                    <div>
                        <label htmlFor="reps" className="block mb-2 font-medium text-gray-700">
                            Reps
                        </label>
                        <input
                            id="reps"
                            name="reps"
                            type="number"
                            required
                            value={formData.reps}
                            onChange={changeHandler}
                            placeholder="Enter number of reps"
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            min="0"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400"
                    >
                        Edit Workout
                    </button>
                </form>
            </div>
        </div>
    );

};

export default EditWorkout;
