"use client"

import { useState } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ThemeProvider } from "@/components/theme-provider"
import { createQueryClient } from "@/lib/query-client"
import { setPublicConfig, type PublicConfig } from "@/lib/config"

export function Providers({
  config,
  children,
}: {
  config: PublicConfig
  children: React.ReactNode
}) {
  // Called during render; safe because the value is identical for every request
  // and every render. Plain functions (api/client.ts) need it outside React.
  setPublicConfig(config)
  const [queryClient] = useState(createQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GoogleOAuthProvider clientId={config.googleClientId}>
          {children}
        </GoogleOAuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
