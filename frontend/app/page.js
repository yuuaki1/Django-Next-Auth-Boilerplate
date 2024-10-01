'use client'

import { useAuth } from './context/AuthContext'
import { useRouter } from 'next/navigation'

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>

  )
}

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
    <div className='flex flex-col justify-center items-center pt-64'>
      <h1>Welcome, {user.username}!</h1>
      <p>Email: {user.email}</p>
      <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-52 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" onClick={handleLogout}>Logout
      <BottomGradient />
      </button>
    </div>
  )
}