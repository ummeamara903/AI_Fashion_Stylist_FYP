const BASE_URL = 'http://localhost:8000/api'

// =========================
// TOGGLE SAVE / UNSAVE IMAGE (PROTECTED)
// =========================
export const toggleSaveImage = async (payload: {
  id: number
  image_url: string
  category?: string
}) => {

  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('Please login first')
  }

  const res = await fetch(`${BASE_URL}/toggle-save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.detail || 'Failed to toggle save')
  }

  return data
}


// =========================
// GET SAVED IMAGES (PROTECTED)
// =========================
export const getSavedImages = async () => {

  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('Please login first')
  }

  const res = await fetch(`${BASE_URL}/saved`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.detail || 'Failed to fetch saved images')
  }

  // ✅ SAFE RETURN (prevents crashes)
  return data?.saved_images || []
}