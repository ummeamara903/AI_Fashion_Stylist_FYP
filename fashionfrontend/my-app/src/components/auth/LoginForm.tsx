'use client'

import { useState } from 'react'

import { loginUser } from '@/services/authService'
import { useAuth } from '@/context/authContext'

type Props = {
  onSuccess?: () => void
  onRegisterClick?: () => void
}

export default function LoginForm({
  onSuccess,
  onRegisterClick
}: Props) {

  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault()

    if (loading) return

    setLoading(true)
    setMessage('')

    try {

      const data = await loginUser({ email, password })

      const token = data.access_token || data.token

      if (!token) throw new Error("Token not received from backend")

      const user = data.user ?? { email }

      login(user, token)

      setTimeout(() => onSuccess?.(), 0)

      setEmail('')
      setPassword('')

    } catch (error: any) {
      setMessage(error?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (

    <form
      onSubmit={handleLogin}
      className="
        w-[92%] sm:w-full
        max-w-md
        bg-white
        p-5 sm:p-8
        rounded-2xl
        shadow-lg
        max-h-[90vh]
        overflow-y-auto
      "
    >

      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Login
      </h2>

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="
          w-full
          bg-gray-100
          p-3
          rounded-lg
          mb-4
          border
          text-sm sm:text-base
        "
        required
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="
          w-full
          bg-gray-100
          p-3
          rounded-lg
          mb-4
          border
          text-sm sm:text-base
        "
        required
      />

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          p-3
          rounded-lg
          bg-black
          text-white
          text-sm sm:text-base
        "
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {/* REGISTER LINK */}
      <p className="text-center text-xs sm:text-sm mt-4 text-gray-600">
        Don’t have an account?{' '}
        <button
          type="button"
          onClick={onRegisterClick}
          className="text-black font-semibold hover:underline"
        >
          Register here
        </button>
      </p>

      {message && (
        <p className="text-center mt-4 text-sm text-red-500">
          {message}
        </p>
      )}

    </form>
  )
}