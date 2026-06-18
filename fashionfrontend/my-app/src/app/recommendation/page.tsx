'use client'

import { useState } from 'react'

import InputForm from '@/components/recommendation/InputForm'
import ResultCard from '@/components/recommendation/ResultCard'
import Loader from '@/components/common/Loader'
import AuthModal from '@/components/auth/AuthModal'

import { useRecommendation } from '@/hooks/useRecommendation'
import { useAuth } from '@/context/authContext'

export default function RecommendationPage() {

  const {
    data,
    loading,
    formData,
    fetchData
  } = useRecommendation()

  const { user } = useAuth()

  const [showLogin, setShowLogin] = useState(false)
  const [pendingPayload, setPendingPayload] = useState<any>(null)

  const handleRecommend = async (payload: any) => {

    if (!user) {
      setPendingPayload(payload)
      setShowLogin(true)
      return
    }

    await fetchData(payload)
  }

  return (

    <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4 sm:px-6 lg:px-8">

      {/* LOGIN MODAL */}
      <AuthModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        type="login"
      />

      {/* PAGE CONTAINER */}
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Generate Your Ideal Look
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Personalized fashion recommendations powered by AI.
          </p>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-start">

          {/* INPUT */}
          <div className="bg-white p-4 sm:p-5 rounded-lg shadow w-full">
            <InputForm onSubmit={handleRecommend} />
          </div>

          {/* RESULT */}
          <div className="bg-white p-4 sm:p-5 rounded-lg shadow min-h-[300px] w-full">

            {loading && <Loader />}

            {!loading && data && (
              <ResultCard
                data={data}
                formData={formData}
              />
            )}

            {!loading && !data && (
              <p className="text-gray-400 text-center mt-20 text-sm">
                Generate recommendations to see results here
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  )
}