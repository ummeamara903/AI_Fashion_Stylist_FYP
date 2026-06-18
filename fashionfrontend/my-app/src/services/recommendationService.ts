const BASE_URL = 'http://localhost:8000/api'

// =========================
// GET RECOMMENDATIONS
// =========================
export const getRecommendations = async (
  payload: any
) => {

  // ✅ GET TOKEN
  const token =
    localStorage.getItem('token')

  // ❌ USER NOT LOGGED IN
  if (!token) {

    throw new Error(
      'Please login first'
    )
  }

  // ✅ API CALL
  const res = await fetch(
    `${BASE_URL}/recommend`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',

        // ✅ JWT TOKEN
        Authorization: `Bearer ${token}`
      },

      body: JSON.stringify(payload)
    }
  )

  // ✅ SAFE JSON PARSE
  let data

  try {

    data = await res.json()

  } catch {

    throw new Error(
      'Invalid server response'
    )
  }

  // ❌ TOKEN EXPIRED / INVALID
  if (res.status === 401) {

    // clear bad auth
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    throw new Error(
      'Session expired. Please login again.'
    )
  }

  // ❌ OTHER ERRORS
  if (!res.ok) {

    throw new Error(
      data.detail ||
      'Failed to fetch recommendation'
    )
  }

  // ✅ RETURN RECOMMENDATION
  return data.recommendation
}