'use client'

import { useState } from 'react'

import AuthModal from '@/components/auth/AuthModal'
import { toggleSaveImage } from '@/services/savedImageService'
import { useAuth } from '@/context/authContext'

export default function SaveButton({ img }: any) {

  const { user, setPendingAction } = useAuth()

  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  const [showAuth, setShowAuth] = useState(false)

  // ======================
  // SAVE FUNCTION
  // ======================
  const saveImage = async () => {

    const res = await toggleSaveImage({
      id: img.id,
      image_url: img.src.medium
    })

    setSaved(res.saved)
  }

  // ======================
  // CLICK SAVE
  // ======================
  const handleSave = async () => {

    // ❌ NOT LOGGED IN → store action globally
    if (!user) {

      // 🔥 IMPORTANT FIX: wrap function safely
      setPendingAction(() => async () => {
        const res = await toggleSaveImage({
          id: img.id,
          image_url: img.src.medium
        })

        setSaved(res.saved)
      })

      setShowAuth(true)
      return
    }

    // ✅ LOGGED IN
    try {

      setLoading(true)
      await saveImage()

    } catch (err) {

      console.log(err)

    } finally {

      setLoading(false)
    }
  }

  return (
    <>

      <button
        onClick={handleSave}
        disabled={loading}
        className={`
          absolute top-2 right-2
          px-3 py-1 rounded-full text-xs
          cursor-pointer transition
          opacity-0 group-hover:opacity-100
          ${saved ? 'bg-green-500' : 'bg-red-500'}
        `}
      >
        {saved ? 'Saved' : 'Save'}
      </button>

      {/* AUTH MODAL */}
      {showAuth && (
        <AuthModal
          open={showAuth}
          onClose={() => setShowAuth(false)}
          type="login"
        />
      )}

    </>
  )
}