"use client"

import { GoogleOAuthProvider } from "@react-oauth/google"
import { AuthProvider } from "@/components/auth/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { GOOGLE_CLIENT_ID } from "@/lib/config"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthProvider>{children}</AuthProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  )
}
