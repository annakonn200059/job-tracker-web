"use client"

import { useEffect } from "react"
import { Button } from "@workspace/ui/components/button"
import { FullPageSpinner } from "@/components/full-page-spinner"
import { redirectToLanding } from "@/lib/redirect"
import { useAuth } from "@/hooks/use-auth"

/** Shows children only to signed-in users; everyone else goes to the landing. */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const auth = useAuth()

  useEffect(() => {
    if (auth.status === "anonymous") redirectToLanding()
  }, [auth.status])

  // After logout, the Back button can restore this page from the browser
  // cache. Reload it so the session is checked again.
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) window.location.reload()
    }
    window.addEventListener("pageshow", onPageShow)
    return () => window.removeEventListener("pageshow", onPageShow)
  }, [])

  if (auth.status === "authenticated") return children

  if (auth.status === "error") {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-4 text-center">
        <p className="text-muted-foreground">
          We couldn&apos;t check your session. Please try again.
        </p>
        <Button onClick={() => void auth.refresh()}>Retry</Button>
      </div>
    )
  }

  return <FullPageSpinner />
}
