'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  getSavedImages,
  toggleSaveImage
} from '@/services/savedImageService'

export default function SavedPage() {

  const router = useRouter()
  const [images, setImages] = useState<any[]>([])

  useEffect(() => {

    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/auth/login')
      return
    }

    fetchSaved()

  }, [])

  const fetchSaved = async () => {
    const data = await getSavedImages()
    setImages(data || [])
  }

  const handleUnsave = async (img: any) => {

    const res = await toggleSaveImage({
      id: Number(img.id),
      image_url: img.url
    })

    if (res.saved === false) {
      setImages(prev => prev.filter(i => i.id !== img.id))
    }
  }

  return (

    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">

      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">
        Saved Images
      </h1>

      {images.length === 0 ? (
        <p className="text-center text-gray-500">
          No saved images yet
        </p>
      ) : (

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-6xl mx-auto">

          {images.map((img) => (

            <div
              key={img.id}
              className="relative rounded-xl overflow-hidden shadow group"
            >

              <img
                src={img.url}
                alt="saved"
                className="w-full h-32 sm:h-40 md:h-48 object-cover"
              />

              <button
                onClick={() => handleUnsave(img)}
                className="
                  absolute top-2 right-2
                  bg-red-500 text-white
                  px-2 py-1 text-xs
                  rounded-full
                  opacity-100 sm:opacity-0 sm:group-hover:opacity-100
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