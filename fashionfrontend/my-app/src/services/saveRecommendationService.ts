const BASE_URL = 'http://localhost:8000/api'

// =========================
// SAVE RECOMMENDATION (PROTECTED)
// =========================
export const saveRecommendation = async (payload: any) => {

  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("Please login first")
  }

  const res = await fetch(`${BASE_URL}/save-recommendation`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`   // ✅ FIX
    },

    body: JSON.stringify(payload)
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.detail || 'Failed to save recommendation')
  }

  return data
}



// =========================
// GET SAVED RECOMMENDATIONS (PROTECTED)
// =========================
export const getSavedRecommendations = async () => {

  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("Please login first")
  }

  const res = await fetch(`${BASE_URL}/saved-recommendations`, {
    method: 'GET',

    headers: {
      Authorization: `Bearer ${token}`   // ✅ FIX
    }
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.detail || 'Failed to fetch saved recommendations')
  }

  return data
}



// =========================
// DELETE SAVED RECOMMENDATION (PROTECTED)
// =========================
export const deleteRecommendation = async (id: number) => {

  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("Please login first")
  }

  const res = await fetch(
    `${BASE_URL}/delete-saved-recommendation/${id}`,
    {
      method: 'DELETE',

      headers: {
        Authorization: `Bearer ${token}`   // ✅ FIX
      }
    }
  )

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.detail || 'Failed to delete recommendation')
  }

  return data
}