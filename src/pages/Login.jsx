import React, { useState } from 'react'
import { UserData } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '../components/Loading'

const Login = () => {
  const [email, setEmail] = useState('')

  const { loginUser, btnLoading } = UserData()
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    loginUser(email, navigate)
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-xl shadow-2xl w-full md:w-[400px]"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome </h2>
        <div className="mb-8">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="border-2 border-gray-300 p-3 pl-10 w-full rounded-md outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              required
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </div>
        </div>
        <button
          className="bg-indigo-500 text-white font-medium py-3 px-6 rounded-md hover:bg-indigo-600 transition-colors w-full"
          disabled={btnLoading}
        >
          {btnLoading ? <LoadingSpinner /> : 'Submit'}
        </button>
        {/* <div className="mt-4 text-gray-600 text-center">
          <a
            href="#"
            className="text-indigo-500 hover:text-indigo-600 font-medium"
          >
            Forgot Email?
          </a>
        </div> */}
      </form>
    </div>
  )
}

export default Login
