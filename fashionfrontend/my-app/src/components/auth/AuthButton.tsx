'use client'

import { useState } from 'react'
import { useAuth } from '@/context/authContext'
import AuthModal from './AuthModal'

export default function AuthButtons() {

  const {
    user,
    logout,
    isLoading
  } = useAuth()

  const [openLogin, setOpenLogin] =
    useState(false)

  const [openRegister, setOpenRegister] =
    useState(false)

  // 🔍 DEBUG (REMOVE LATER)
  console.log('AUTH BUTTONS STATE:', {
    user,
    isLoading
  })

  // LOADING STATE
  if (isLoading) return null

  // LOGGED IN UI
  if (user) {

    return (

      <button
        onClick={() => {
          console.log('LOGOUT CLICKED')
          logout()
        }}
        className="
          bg-black text-white
          px-4 py-2
          rounded-lg
          cursor-pointer
          hover:opacity-90
          transition
        "
      >
        Logout
      </button>
    )
  }

  // LOGGED OUT UI 
  return (

    <>

      <div className="flex gap-3">

        <button
          onClick={() => {
            console.log('OPEN LOGIN MODAL')
            setOpenLogin(true)
          }}
          className="
            border border-black
            px-4 py-2
            rounded-lg
            cursor-pointer
            hover:bg-black
            hover:text-white
            transition
          
          "
        >
          Login
        </button>

        <button
          onClick={() => {
            console.log('OPEN REGISTER MODAL')
            setOpenRegister(true)
          }}
          className="
            bg-black text-white
            px-4 py-2
            rounded-lg
            cursor-pointer
            hover:opacity-90
            transition
          "
        >
          Register
        </button>

      </div>

      {/* LOGIN MODAL */}
      <AuthModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        type="login"
      />

      {/* REGISTER MODAL */}
      <AuthModal
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        type="register"
      />

    </>
  )
}