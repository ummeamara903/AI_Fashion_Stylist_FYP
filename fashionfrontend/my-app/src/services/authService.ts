const BASE_URL = 'http://localhost:8000/api/auth'

// =========================
// REGISTER
// =========================
export const registerUser = async (data: {
  username: string
  email: string
  password: string
}) => {

  const response = await fetch(
    `${BASE_URL}/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )

  const result = await response.json()

  if (!response.ok) {
    throw new Error(
      result.detail || 'Registration failed'
    )
  }

  return result
}

// =========================
// LOGIN
// =========================
export const loginUser = async (data: {
  email: string
  password: string
}) => {

  const response = await fetch(
    `${BASE_URL}/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )

  const result = await response.json()

  if (!response.ok) {
    throw new Error(
      result.detail || 'Login failed'
    )
  }

  // ✅ JUST RETURN DATA (NO LOCALSTORAGE HERE)
  return result
}

// =========================
// LOGOUT
// =========================
export const logoutUser = () => {

  localStorage.removeItem('token')
  localStorage.removeItem('user')
}