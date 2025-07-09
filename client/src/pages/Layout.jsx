import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 py-6 md:px-10">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
