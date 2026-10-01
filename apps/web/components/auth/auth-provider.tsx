"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { authApi } from "@/api/auth"
import { ApiError } from "@/api/client"
import { redirectToLanding } from "@/lib/redirect"
import type { User } from "@/types/user"

type AuthState =
  | { status: "loading" }
  | { status: "authenticated"; user: User }
  | { status: "anonymous" }
  /** /auth/me failed for a reason other than 401 (server down, 500...) */
  | { status: "error" }

type AuthContextValue = AuthState & {
  setUser: (user: User) => void
  refresh: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

async function fetchAuthState(): Promise<AuthState> {
  try {
    return { status: "authenticated", user: await authApi.me() }
  } catch (error) {
    const isLoggedOut = error instanceof ApiError && error.status === 401
    return { status: isLoggedOut ? "anonymous" : "error" }
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: "loading" })

  useEffect(() => {
    fetchAuthState().then(setState)
  }, [])

  const setUser = useCallback((user: User) => {
    setState({ status: "authenticated", user })
  }, [])

  const refresh = useCallback(async () => {
    setState({ status: "loading" })
    setState(await fetchAuthState())
  }, [])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch {
      // Leave anyway: the full page load below resets everything.
    } finally {
      redirectToLanding({ saveReturnTo: false })
      setState({ status: "anonymous" })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, setUser, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>")
  return context
}
