"use client"

import { useState } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ThemeProvider } from "@/components/theme-provider"
import { GOOGLE_CLIENT_ID } from "@/lib/config"
import { createQueryClient } from "@/lib/query-client"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(createQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          {children}
        </GoogleOAuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
