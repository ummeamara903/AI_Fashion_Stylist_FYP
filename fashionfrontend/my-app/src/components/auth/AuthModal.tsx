'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

type Props = {
  open: boolean
  onClose: () => void
  type: 'login' | 'register'
}

export default function AuthModal({
  open,
  onClose,
  type: initialType
}: Props) {

  const [type, setType] = useState(initialType)

  if (!open) return null

  return createPortal(

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999] p-4">

      <div className="relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white text-red-500 w-8 h-8 rounded-full"
        >
          ✕
        </button>

        {/* SWITCH BETWEEN FORMS */}
        {type === 'login' ? (

          <LoginForm
            onSuccess={onClose}
            onRegisterClick={() => setType('register')}
          />

        ) : (

          <RegisterForm
            onSuccess={onClose}
            onSwitchToLogin={() => setType('login')}
          />

        )}

      </div>

    </div>,

    document.body
  )
}