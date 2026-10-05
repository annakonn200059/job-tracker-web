"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { useAuth } from "@/hooks/use-auth"

const NAV_LINKS = [
  { href: "/", label: "Board" },
  { href: "/vacancies", label: "Vacancies" },
]

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href)
}

export function AppHeader() {
  const auth = useAuth()
  const pathname = usePathname()
  const user = auth.status === "authenticated" ? auth.user : null

  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-3">
      <div className="flex items-center gap-6">
        <span className="font-heading font-bold">Job Tracker</span>
        <nav className="flex gap-4">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm text-muted-foreground transition-colors hover:text-primary",
                isActive(pathname, href) && "font-medium text-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
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
