"use client"
import Link from 'next/link'
import React from 'react'

const AdminIndex = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen md:h-[85vh] bg-gray-50 py-10">

      {/* Main Content Wrapper */}
      <div className="w-full max-w-5xl lg:bg-white p-3 lg:p-10 lg:rounded-xl lg:shadow-lg space-y-8">

        {/* Admin Dashboard Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          Admin Dashboard
        </h1>

        {/* Create Question Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Create New Question</h2>
          <p className="text-white mb-6 text-center">
            Click below to add a new question to your quiz. Ensure the question and answers are accurate.
          </p>
          <div className="flex justify-center">
           <Link href={`/admin/createquiz`}>
           <button className="w-full sm:w-auto cursor-pointer px-8 py-3 bg-yellow-500 text-gray-900 rounded-full text-lg font-medium shadow-md hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
  Create Question
</button>

           </Link>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-gradient-to-r from-gray-600 to-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Recent Activity</h3>
          <p className="text-white text-center">
            Track the latest updates such as newly created questions or any other admin activities.
          </p>
        </div>

        {/* Manage Users Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Manage Users</h3>
          <p className="text-white text-center">
            Add or remove users, assign roles, and manage user permissions for your quiz platform.
          </p>
        </div>

      </div>
    </div>
  )
}

export default AdminIndex
