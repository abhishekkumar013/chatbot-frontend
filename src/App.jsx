import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Verify from './pages/Verify'
import Header from './components/Header'
import { UserData } from './context/UserContext'

const App = () => {
  const { user, isAuth, isVerified } = UserData()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (
      !isAuth &&
      location.pathname !== '/login' &&
      location.pathname !== '/verify'
    ) {
      navigate('/login')
    } else if (isAuth && !isVerified && location.pathname !== '/verify') {
      navigate('/verify')
    } else if (isAuth && isVerified && location.pathname !== '/') {
      navigate('/')
    }
  }, [isAuth, isVerified, location.pathname])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </>
  )
}

export default App
