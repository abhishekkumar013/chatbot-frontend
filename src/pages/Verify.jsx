import React, { useState } from 'react'
import { UserData } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '../components/Loading'
const Verify = () => {
  const [otp, setOTP] = useState('')
  const { verifyUser, btnLoading } = UserData()

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    verifyUser(otp, navigate)
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-xl shadow-2xl w-full md:w-[400px]"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome </h2>
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="otp">
            OTP
          </label>
          <div className="relative">
            <input
              type="number"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              id="otp"
              className="border-2 border-gray-300 p-3 pl-10 w-full rounded-md outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
        <button className="bg-indigo-500 text-white font-medium py-3 px-6 rounded-md hover:bg-indigo-600 transition-colors w-full">
          {btnLoading ? <LoadingSpinner /> : 'Verify'}
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

export default Verify
