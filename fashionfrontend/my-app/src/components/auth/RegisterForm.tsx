'use client'

import { useState } from 'react'

import { registerUser } from '@/services/authService'

type Props = {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

export default function RegisterForm({
  onSuccess,
  onSwitchToLogin
}: Props) {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {

    e.preventDefault()

    if (loading) return

    setLoading(true)
    setMessage('')

    try {

      await registerUser({ username, email, password })

      setMessage('Registration successful')

      setUsername('')
      setEmail('')
      setPassword('')

      setTimeout(() => onSuccess?.(), 800)

    } catch (error: any) {
      setMessage(error?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (

    <form
      onSubmit={handleRegister}
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
        Register
      </h2>

      {/* USERNAME */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        {loading ? 'Registering...' : 'Register'}
      </button>

      {/* SWITCH */}
      <p className="text-center text-xs sm:text-sm mt-4 text-gray-600">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-black font-semibold hover:underline"
        >
          Login here
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