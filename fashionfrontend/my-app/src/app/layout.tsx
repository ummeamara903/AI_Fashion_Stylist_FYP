// src/app/layout.tsx

import './globals.css'

import { ReactNode } from 'react'

import Navbar from '@/components/navbar/Navbar'

import { AuthProvider } from '@/context/authContext'

export default function RootLayout({
  children
}: {
  children: ReactNode
}) {

  return (

    <html lang="en">

     <body className="bg-gray-50 text-black overflow-x-hidden">

        {/* ✅ GLOBAL AUTH PROVIDER */}
        <AuthProvider>

          <Navbar />

          {children}

        </AuthProvider>

      </body>

    </html>
  )
}