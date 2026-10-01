"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { Container } from "./Container"
import { Logo } from "./Logo"
import { APP_URL, LOGIN_URL, ME_URL, REGISTER_URL } from "@/lib/urls"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [signedIn, setSignedIn] = useState(false)

  // Only decides which button to show. The landing never redirects on 401.
  useEffect(() => {
    fetch(ME_URL, { credentials: "include" })
      .then((res) => setSignedIn(res.ok))
      .catch(() => setSignedIn(false))
  }, [])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur transition-shadow duration-200 supports-[backdrop-filter]:bg-background/80 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <Container>
        <div className="flex items-center justify-between py-4">
          <Logo />

          {/* Links */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Pricing
            </Link>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            {signedIn ? (
              <Button asChild size="sm">
                <a href={APP_URL}>Open app</a>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex"
                >
                  <a href={LOGIN_URL}>Log in</a>
                </Button>
                <Button asChild size="sm">
                  <a href={REGISTER_URL}>Get Started</a>
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  )
}
