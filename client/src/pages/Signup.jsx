import React, { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext.jsx'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

// Heroicons
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline'

const Signup = () => {
  const { setIsLoggedIn } = useContext(UserContext)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)

  const changeHandler = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const togglePassword = () => setShowPassword((prev) => !prev)

  const URI = import.meta.env.VITE_BACKEND_URI
  const navigate = useNavigate()

  const signupUserAccount = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${URI}/api/v1/users/signup`, formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })

      if (data.success) {
        setIsLoggedIn(true)
        toast.success(data.message)
        navigate('/')
      }
    } catch (err) {
      toast.error(err.response?.data.message || 'Signup failed')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Create an Account
        </h1>

        <form onSubmit={signupUserAccount} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
              <UserIcon className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={changeHandler}
                placeholder="Your name"
                className="w-full outline-none text-sm text-gray-900 placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
              <EnvelopeIcon className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={changeHandler}
                placeholder="you@example.com"
                className="w-full outline-none text-sm text-gray-900 placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
              <LockClosedIcon className="w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={formData.password}
                onChange={changeHandler}
                placeholder="••••••••"
                className="w-full outline-none text-sm text-gray-900 placeholder-gray-400"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            Sign Up
          </button>
        </form>

        {/* Redirect */}
        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
