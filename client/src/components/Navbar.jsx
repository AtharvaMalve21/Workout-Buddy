import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Navbar = () => {
  const { user, setIsLoggedIn, setUser } = useContext(UserContext)
  const URI = import.meta.env.VITE_BACKEND_URI
  const navigate = useNavigate();

  const [dropDownMenu, setDropDownMenu] = useState(false);


  const toggleDropDownMenu = () => {
    setDropDownMenu((prev) => !prev)
  }

  const logoutUserAccount = async () => {
    try {
      const { data } = await axios.get(`${URI}/api/v1/users/logout`, {
        withCredentials: true,
      })

      if (data.success) {
        setUser(null)
        setIsLoggedIn(false)
        toast.success(data.message)
        navigate('/login')
      }
    } catch (err) {
      toast.error(err.response?.data.message || 'Logout failed')
    }
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/weightlifting.png"
            alt="WorkoutBuddy Logo"
            className="h-10 w-10 object-contain"
          />
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Workout<span className="text-violet-600">Buddy</span>
          </h1>
        </Link>

        {/* Auth Buttons / User Avatar */}
        {user ? (
          <div className="relative">
            <div
              onClick={toggleDropDownMenu}
              className="w-10 h-10 cursor-pointer rounded-full bg-violet-600 text-white flex items-center justify-center font-semibold text-base uppercase shadow hover:bg-violet-700 transition"
            >
              {user.name?.charAt(0)}
            </div>

            {/* Dropdown Menu */}
            {dropDownMenu && (
              <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg p-2 w-32 z-10">
                <button
                  onClick={logoutUserAccount}
                  className="w-full text-left text-red-500 hover:text-red-600 px-3 py-2 text-sm font-medium transition rounded hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-violet-600 font-medium text-sm transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>

  )
}

export default Navbar
