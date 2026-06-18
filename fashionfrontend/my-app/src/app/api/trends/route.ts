import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query') || 'fashion'
    
    const page = searchParams.get('page') || '1'
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=20&page=${page}`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY || ''
        }
      }
    )

    const data = await res.json()

    console.log("PEXELS DATA:", data) // 👈 DEBUG

    return NextResponse.json(data.photos || [])
  } catch (error) {
    return NextResponse.json([], { status: 200 })
  }
}
