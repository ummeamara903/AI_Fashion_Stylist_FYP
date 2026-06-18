'use client'

import Link from 'next/link'
import { useState } from 'react'

type Props = {
  isHome: boolean
  mobile?: boolean
}

export default function NavLinks({ isHome, mobile }: Props) {

  const [open, setOpen] = useState(false)

  const baseClass = mobile
    ? "flex flex-col gap-3 text-black"
    : `flex gap-8 font-medium items-center ${isHome ? 'text-white' : 'text-black'}`

  return (

    <div className={baseClass}>

      <Link href="/" className="hover:opacity-70">
        Home
      </Link>

      <Link href="/trends" className="hover:opacity-70">
        Trends
      </Link>

      <Link href="/about" className="hover:opacity-70">
        About
      </Link>

      {/* DROPDOWN */}
      <div className="relative">

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1"
        >
          Saved
          <span className={`transition ${open ? 'rotate-180' : ''}`}>
            ▾
          </span>
        </button>

        {open && (
          <div className="absolute md:top-10 top-0 left-0 md:w-56 w-full bg-white shadow-lg rounded-xl overflow-hidden z-50">

            <Link
              href="/saved/trend"
              className="block px-4 py-3 hover:bg-gray-100 text-sm"
            >
              Saved Images
            </Link>

            <Link
              href="/saved/recommendation"
              className="block px-4 py-3 hover:bg-gray-100 text-sm"
            >
              Saved Recommendations
            </Link>

          </div>
        )}

      </div>

    </div>
  )
}