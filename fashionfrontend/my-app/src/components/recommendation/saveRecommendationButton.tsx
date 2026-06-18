'use client'

import { useState } from 'react'

import { saveRecommendation } from '@/services/saveRecommendationService'
import { useAuth } from '@/context/authContext'
import LoginForm from '@/components/auth/LoginForm'

export default function SaveRecommendationButton({
  data,
  formData
}: any) {

  const { user } = useAuth()

  const [saved, setSaved] = useState(false)

  const [showLogin, setShowLogin] = useState(false)

  const [pendingSave, setPendingSave] = useState(false)

  // ✅ SAVE FUNCTION
  const handleSave = async () => {

    if (!user) {

      // store pending action
      setPendingSave(true)

      setShowLogin(true)

      return
    }

    try {

      await saveRecommendation({
        gender: formData.gender,
        season: formData.season,
        occasion: formData.occasion,
        dress_type: formData.dress_type,
        budget: formData.budget,

        product: data.product,
        shoes: data.shoes,
        accessory: data.accessory,
        color: data.color
      })

      setSaved(true)

    } catch (error) {

      console.log(error)
    }
  }

  // ✅ AFTER LOGIN SUCCESS
  const handleLoginSuccess = async () => {

    setShowLogin(false)

    if (pendingSave) {

      setPendingSave(false)

      await handleSave()
    }
  }

  return (

    <>
      {/* ✅ LOGIN FORM POPUP */}
      {
        showLogin && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <LoginForm
              onSuccess={handleLoginSuccess}
            />

          </div>
        )
      }

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        className={`mt-4 px-4 py-2 rounded text-sm transition
        ${
          saved
            ? 'bg-green-500 text-white'
            : 'bg-black text-white'
        }`}
      >
        {saved ? 'Saved' : 'Save Recommendation'}
      </button>
    </>
  )
}