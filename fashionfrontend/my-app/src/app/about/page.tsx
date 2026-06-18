'use client'

import Image from 'next/image'
import Footer from '@/components/common/footer'

export default function AboutPage() {
  return (
    <div className="bg-white text-black pt-24 mb-2">

      {/* PAGE CONTENT WRAPPER */}
      <div className="px-8 md:px-20">

        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About FashionStylist
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            FashionStylist is your personal inspiration hub for modern fashion trends.
            We help you discover styles, save your favorite looks, and stay ahead in the world of fashion.
          </p>
        </div>

        {/* IMAGE SECTION */}
        <div className="mt-12 flex justify-center">
          <Image
            src="/images/aboutfashion.jpg"
            alt="Fashion"
            width={900}
            height={500}
            className="rounded-2xl object-cover shadow-lg"
          />
        </div>

        {/* MISSION SECTION */}
        <div className="mt-16 grid md:grid-cols-3 gap-10 text-center">

          <div>
            <h3 className="text-xl font-semibold mb-2">Inspiration</h3>
            <p className="text-gray-600 text-sm">
              Discover curated fashion trends from around the world.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Save Ideas</h3>
            <p className="text-gray-600 text-sm">
              Save your favorite outfits and build your personal style board.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
            <p className="text-gray-600 text-sm">
              Get the latest fashion trends in real time.
            </p>
          </div>

        </div>

      </div>

      
      <Footer />

    </div>
  )
}