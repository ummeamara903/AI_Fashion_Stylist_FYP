'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import SaveButton from '@/components/common/saveButton'

const categories = [
  { name: 'All', query: 'trending outfits in Pakistan both eastern and western' },
  { name: 'Western', query: 'modest western outfit men women jeans shirt baggy coat' },
  { name: 'Eastern', query: 'pakistani traditional dress shalwar kameez men women' },
  { name: 'Casual', query: 'casual outfit men women loose fit streetwear' },
  { name: 'Formal', query: 'formal suit men women blazer coat elegant' }
]

export default function TrendsPage() {

  const router = useRouter()

  const [images, setImages] = useState<any[]>([])
  const [active, setActive] = useState(categories[0])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)


 

  // FETCH IMAGES

  const fetchImages = async (query: string, pageNum: number) => {
    try {
      setLoading(true)

      const res = await fetch(
        `/api/trends?query=${query}&page=${pageNum}`
      )

      const data = await res.json()

      if (pageNum === 1) {
        setImages(data)
      } else {
        setImages(prev => [...prev, ...data])
      }

    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // CATEGORY / PAGE CHANGE
  // =========================
  useEffect(() => {
    fetchImages(active.query, page)
  }, [active, page])

  useEffect(() => {
    setImages([])
    setPage(1)
  }, [active])

  // =========================
  // INFINITE SCROLL
  // =========================
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setPage(prev => prev + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="pt-20 px-6 bg-gray-100 min-h-screen">

      {/* CATEGORY FILTER */}
      <div className="flex justify-center flex-wrap gap-3 mb-8">

        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full shadow transition ${
              active.name === cat.name
                ? 'bg-black text-white'
                : 'bg-white'
            }`}
          >
            {cat.name}
          </button>
        ))}

      </div>

      {/* LOADING */}
      {loading && page === 1 && (
        <p className="text-center">Loading...</p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {images.length > 0 ? (
          images.map((img) => (
            <div
              key={img.id}
              className="relative w-full h-72 overflow-hidden rounded-xl group"
            >

              <img
                src={img.src?.medium}
                alt="fashion"
                className="w-full h-full object-cover transition group-hover:scale-105 duration-300"
              />

              {/* 🔐 SAVE BUTTON (AUTH REQUIRED INSIDE COMPONENT) */}
              <SaveButton img={img} category={active.name} />

            </div>
          ))
        ) : (
          !loading && (
            <p className="text-center col-span-4">
              No images found
            </p>
          )
        )}

      </div>

      {/* LOADING MORE */}
      {loading && page > 1 && (
        <p className="text-center mt-4">Loading more...</p>
      )}

    </div>
  )
}