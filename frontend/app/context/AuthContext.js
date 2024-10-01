'use client'

import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('access_token')
      if (token) {
        try {
          const res = await axios.get('http://localhost:8000/api/user/', {
            headers: { Authorization: `Bearer ${token}` }
          })
          setUser(res.data)
        } catch (error) {
          console.error('Error loading user', error)
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
        }
      }
      setLoading(false)
    }
    loadUser()
  }, [])

  const login = async (username, password) => {
    const res = await axios.post('http://localhost:8000/api/login/', { username, password })
    localStorage.setItem('access_token', res.data.access)
    localStorage.setItem('refresh_token', res.data.refresh)
    setUser(res.data.user)
    return res.data
  }

  const register = async (username, email, password) => {
    const res = await axios.post('http://localhost:8000/api/register/', { username, email, password })
    return res.data
  }

  const logout = async () => {
    const refresh_token = localStorage.getItem('refresh_token')
    if (refresh_token) {
      try {
        await axios.post('http://localhost:8000/api/logout/', { refresh_token })
      } catch (error) {
        console.error('Error during logout', error)
      }
    }
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)