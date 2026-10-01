"use client"

import { Button } from "@workspace/ui/components/button"
import { useAuth } from "@/hooks/use-auth"

export function AppHeader() {
  const auth = useAuth()
  const user = auth.status === "authenticated" ? auth.user : null

  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-3">
      <span className="font-heading font-bold">Job Tracker</span>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          {user?.display_name ?? user?.email}
        </span>
        <Button variant="ghost" size="sm" onClick={() => void auth.logout()}>
          Log out
        </Button>
      </div>
    </header>
  )
}
