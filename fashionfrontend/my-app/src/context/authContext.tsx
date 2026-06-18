'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

type User = {
  id: number
  email: string
  name?: string
}

type AuthContextType = {
  user: User | null
  token: string | null
  isLoading: boolean

  login: (user: User, token: string) => void
  logout: () => void

  // 🔥 NEW: pending action system
  setPendingAction: (fn: (() => void) | null) => void
}

const AuthContext =
  createContext<AuthContextType | null>(null)

export function AuthProvider({
  children
}: {
  children: React.ReactNode
}) {

  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 🔥 NEW: store action after login
  const [pendingAction, setPendingAction] =
    useState<(() => void) | null>(null)

  // =========================
  // LOAD AUTH
  // =========================
  useEffect(() => {

    try {

      const savedToken =
        localStorage.getItem('token')

      const savedUser =
        localStorage.getItem('user')

      if (savedToken && savedUser && savedUser !== 'undefined') {

        setToken(savedToken)
        setUser(JSON.parse(savedUser))
      }

    } catch (error) {

      console.log('Error loading auth')

      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }

    setIsLoading(false)

  }, [])

  // =========================
  // LOGIN
  // =========================
  const login = (userData: User, authToken: string) => {

    setUser(userData)
    setToken(authToken)

    localStorage.setItem('token', authToken)
    localStorage.setItem('user', JSON.stringify(userData))

    // 🔥 RUN PENDING ACTION AFTER LOGIN
    setTimeout(() => {
      if (pendingAction) {
        pendingAction()
        setPendingAction(null)
      }
    }, 0)
  }

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {

    setUser(null)
    setToken(null)

    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isLoading,

        // 🔥 NEW
        setPendingAction
      }}
    >

      {children}

    </AuthContext.Provider>
  )
}

// =========================
// CUSTOM HOOK
// =========================
export function useAuth() {

  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}