import Link from 'next/link'

export default function Footer() {

  return (

    <footer className="w-full bg-black text-white mt-10 sm:mt-20">

      <div className="px-5 sm:px-10 md:px-20 py-10">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              FashionStylist
            </h2>

            <p className="text-gray-400 text-sm">
              Discover, save and explore fashion trends effortlessly.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>

            <div className="flex flex-col gap-2 text-gray-400 text-sm">
              <Link href="/">Home</Link>
              <Link href="/trends">Trends</Link>
              <Link href="/about">About</Link>
              <Link href="/saved">Saved</Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>

            <p className="text-gray-400 text-sm break-words">
              fashionstylist@email.com
            </p>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="text-center text-gray-500 text-xs mt-10">
          © {new Date().getFullYear()} FashionStylist. All rights reserved.
        </div>

      </div>

    </footer>
  )
}