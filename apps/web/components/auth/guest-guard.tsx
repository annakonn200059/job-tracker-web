"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { FullPageSpinner } from "@/components/full-page-spinner"
import { takeReturnTo } from "@/lib/redirect"
import { useAuth } from "./auth-provider"

/**
 * For /login and /register. Signed-in users are sent into the app, back to
 * the page they came from. This also runs right after a successful sign-in.
 */
export function GuestGuard({ children }: { children: React.ReactNode }) {
  const { status } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") router.replace(takeReturnTo("/"))
  }, [status, router])

  if (status === "loading" || status === "authenticated") {
    return <FullPageSpinner />
  }

  return children
}
