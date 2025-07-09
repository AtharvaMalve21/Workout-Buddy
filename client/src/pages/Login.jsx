import React, { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext.jsx'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

// Heroicons
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline'

const Login = () => {
  const { setIsLoggedIn } = useContext(UserContext)
  const navigate = useNavigate()
  const URI = import.meta.env.VITE_BACKEND_URI

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)

  const changeHandler = (ev) => {
    const { name, value } = ev.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const togglePassword = () => setShowPassword((prev) => !prev)

  const loginUserAccount = async (ev) => {
    ev.preventDefault()
    try {
      const { data } = await axios.post(`${URI}/api/v1/users/login`, formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })

      if (data.success) {
        setIsLoggedIn(true)
        toast.success(data.message)
        navigate('/')
      }
    } catch (err) {
      toast.error(err.response?.data.message || 'Login failed')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Welcome Back!
        </h1>

        <form onSubmit={loginUserAccount} className="space-y-6">
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
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
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
            Login
          </button>
        </form>

        {/* Link to Signup */}
        <p className="text-sm text-center mt-6 text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Signup
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
