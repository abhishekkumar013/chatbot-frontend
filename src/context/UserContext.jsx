import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { server } from '../main'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [btnLoading, setBtnLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  async function loginUser(email, navigate) {
    setBtnLoading(true)
    try {
      const { data } = await axios.post(
        `${server}/user/login`,
        { email },
        { withCredentials: true },
      )

      toast.success(data.message)
      navigate('/verify')

      setBtnLoading(false)
    } catch (error) {
      console.log(error)
      setBtnLoading(false)
      toast.error(error.response.data.message)
    }
  }

  async function verifyUser(otp, navigate) {
    setBtnLoading(true)
    try {
      const { data } = await axios.post(
        `${server}/user/verify`,
        { otp },
        { withCredentials: true },
      )

      toast.success(data.message)
      navigate('/')

      setBtnLoading(false)
      setIsAuth(true)
      setUser(data.data)
      setIsVerified(true)
      localStorage.setItem('isAuth', 'true')
    } catch (error) {
      setIsAuth(false)
      setBtnLoading(false)
      toast.error(error.response.data.message)
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/user/me`, {
        withCredentials: true,
      })

      setBtnLoading(false)
      setIsAuth(true)
      setIsVerified(true)
      setUser(data.data)
    } catch (error) {
      setIsAuth(false)
      setBtnLoading(false)
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    localStorage.setItem('isAuth', isAuth.toString())
  }, [isAuth])

  useEffect(() => {
    const storedIsAuth = localStorage.getItem('isAuth')
    setIsAuth(storedIsAuth === 'true')
    setIsVerified(storedIsAuth === 'true')
  }, [])

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <UserContext.Provider
      value={{ loginUser, btnLoading, verifyUser, user, isAuth, isVerified }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  )
}

export const UserData = () => useContext(UserContext)
