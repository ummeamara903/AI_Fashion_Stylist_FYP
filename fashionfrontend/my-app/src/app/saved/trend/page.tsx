'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  getSavedImages,
  toggleSaveImage
} from '@/services/savedImageService'

export default function SavedTrendPage() {

  const router = useRouter()

  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // =========================
  // AUTH CHECK
  // =========================
  useEffect(() => {

    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/auth/login')
      return
    }

    fetchSavedImages()

  }, [])

  // =========================
  // FETCH SAVED IMAGES
  // =========================
  const fetchSavedImages = async () => {

    try {

      setLoading(true)

      const data = await getSavedImages()

      console.log('Saved Images:', data)

      // ✅ data is already array
      setImages(data || [])

    } catch (error) {

      console.log(error)
      setImages([])

    } finally {

      setLoading(false)
    }
  }

  // =========================
  // UNSAVE IMAGE
  // =========================
  const handleUnsave = async (img: any) => {

    try {

      const res = await toggleSaveImage({

        id: Number(img.id),

        // ✅ IMPORTANT FIX
        image_url: img.url
      })

      // ✅ remove instantly
      if (res.saved === false) {

        setImages(prev =>
          prev.filter(item => item.id !== img.id)
        )
      }

    } catch (error) {

      console.log('Unsave Error:', error)
    }
  }

  return (

    <div className="min-h-screen bg-gray-100 pt-20 px-6 pb-10">

      <h1 className="text-3xl font-bold text-center mb-8">
        Saved Trend Images
      </h1>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500">
          Loading...
        </p>
      )}

      {/* EMPTY */}
      {!loading && images.length === 0 && (
        <p className="text-center text-gray-500">
          No saved images yet
        </p>
      )}

      {/* GRID */}
      {!loading && images.length > 0 && (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {images.map((img) => (

            <div
              key={img.id}
              className="relative rounded-2xl overflow-hidden shadow bg-white group"
            >

              {/* ✅ IMPORTANT FIX */}
              <img
                src={img.url}
                alt="saved"
                className="w-full h-72 object-cover"
              />

              {/* UNSAVE */}
              <button
                onClick={() => handleUnsave(img)}
                className="
                  absolute top-2 right-2
                  bg-red-500 hover:bg-red-600
                  text-white text-xs
                  px-3 py-1 rounded-full
                  opacity-0 group-hover:opacity-100
                  transition cursor-pointer
                "
              >
                Unsave
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}