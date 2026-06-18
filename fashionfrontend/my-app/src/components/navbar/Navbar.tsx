'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import NavLinks from './NavLinks'
import AuthButtons from '@/components/auth/AuthButton'

export default function Navbar() {

  const pathname = usePathname()
  const isHome = pathname === '/'

  const [mobileOpen, setMobileOpen] = useState(false)

  return (

    <nav
      className={`
        fixed top-0 w-full z-50
        px-4 sm:px-6 lg:px-8
        py-3
        flex items-center justify-between
        transition-all duration-300

        ${isHome
          ? 'bg-transparent text-white border-b border-white/20'
          : 'bg-white/90 backdrop-blur text-black shadow-sm'
        }
      `}
    >

      {/* LOGO */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/images/fslogo.png"
          alt="Fashion Stylist"
          width={40}
          height={40}
        />

        <span className="text-lg sm:text-xl font-semibold">
          FashionStylist
        </span>
      </Link>

      {/* DESKTOP NAV */}
      <div className="hidden md:flex items-center gap-8">
        <NavLinks isHome={isHome} />
      </div>

      {/* AUTH BUTTONS (DESKTOP) */}
      <div className="hidden md:block">
        <AuthButtons />
      </div>

      {/* MOBILE BUTTON */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
      </button>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden z-50">

          <div className="flex flex-col p-4 gap-4">

            <NavLinks isHome={false} mobile />

            <AuthButtons />

          </div>

        </div>
      )}

    </nav>
  )
}