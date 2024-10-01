'use client'

import { useAuth } from './context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    }
    catch(err) {
      console.error(err)
    }
  }

  if (loading) return <div>Loading...</div>

  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}