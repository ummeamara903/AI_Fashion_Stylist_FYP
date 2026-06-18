'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  getSavedRecommendations,
  deleteRecommendation
} from '@/services/saveRecommendationService'

export default function SavedRecommendationPage() {

  const router = useRouter()

  const [recommendations, setRecommendations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthChecked, setIsAuthChecked] = useState(false)

  useEffect(() => {

    const token = localStorage.getItem('token')

    if (!token) {
      router.replace('/auth/login')
      return
    }

    setIsAuthChecked(true)

  }, [router])

  const fetchRecommendations = async () => {

    try {
      setLoading(true)

      const data = await getSavedRecommendations()
      setRecommendations(data.saved_recommendations || [])

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthChecked) fetchRecommendations()
  }, [isAuthChecked])

  const handleDelete = async (id: number) => {

    await deleteRecommendation(id)

    setRecommendations(prev =>
      prev.filter(item => item.id !== id)
    )
  }

  if (!isAuthChecked) return null

  return (

    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 pt-20 px-4 sm:px-6 lg:px-8">

      <h1 className="text-xl sm:text-2xl font-bold text-center mb-8 text-gray-800">
        Saved Recommendations
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : recommendations.length === 0 ? (
        <p className="text-center text-gray-500">
          No saved recommendations yet
        </p>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">

          {recommendations.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl shadow p-4 sm:p-5 relative"
            >

              {/* DELETE */}
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-3 right-3 text-xs bg-red-500 text-white px-3 py-1 rounded-full"
              >
                Delete
              </button>

              {/* PREFS */}
              <div className="mb-4">
                <h2 className="text-sm sm:text-base font-semibold mb-2 text-pink-600">
                  Preferences
                </h2>

                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                  <p>Gender: {item.gender}</p>
                  <p>Season: {item.season}</p>
                  <p>Occasion: {item.occasion}</p>
                  <p>Dress: {item.dress_type}</p>
                  <p>Budget: {item.budget}</p>
                </div>
              </div>

              {/* ITEMS */}
              <div className="space-y-3 text-sm">

                {[
                  ['Products', item.product],
                  ['Shoes', item.shoes],
                  ['Accessories', item.accessory],
                  ['Colors', item.color],
                ].map(([title, list]: any, i) => (

                  <div key={i}>
                    <h3 className="font-semibold text-sm mb-1">
                      {title}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {list?.map((x: string, i: number) => (
                        <span
                          key={i}
                          className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                        >
                          {x}
                        </span>
                      ))}
                    </div>
                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}