'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import Footer from '@/components/common/footer'

export default function Home() {

  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6
    }
  }, [])

  return (

    <main className="w-full overflow-x-hidden">

      {/* HERO */}
      <section className="relative h-[85vh] sm:h-screen w-full">

        <div className="absolute inset-0">
          <img
            src="/images/dark.png"
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex items-center justify-center px-4">

          <button
            onClick={() => router.push('/recommendation')}
            className="
              bg-green-500 text-white
              px-6 sm:px-10 md:px-12
              py-3 sm:py-4 md:py-5
              rounded-full
              text-sm sm:text-lg
              font-semibold
              hover:bg-green-600
              transition
              transform hover:scale-105
              shadow-xl
            "
          >
            Get Recommendation
          </button>

        </div>

      </section>

      {/* VIDEO SECTION */}
      <section className="w-full py-14 sm:py-20 bg-white overflow-hidden">

        <div className="text-center mb-8 px-4 sm:px-10">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Fashion Inspiration
          </h2>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Explore trending styles in motion
          </p>

        </div>

        {/* VIDEO */}
        <div className="relative w-full h-[220px] sm:h-[350px] md:h-[500px] overflow-hidden">

          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/first.mp4" type="video/mp4" />
          </video>

        </div>

      </section>

      {/* FOOTER */}
      <Footer />

    </main>
  )
}