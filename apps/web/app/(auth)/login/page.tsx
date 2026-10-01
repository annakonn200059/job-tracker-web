"use client"

import { useState } from "react"
import Link from "next/link"
import { Alert } from "@workspace/ui/components/alert"
import { Button } from "@workspace/ui/components/button"
import { authApi } from "@/api/auth"
import { AuthCard } from "@/components/auth/auth-card"
import { useAuth } from "@/components/auth/auth-provider"
import { Field } from "@/components/auth/field"
import { AUTH_MESSAGES, toErrorMessage } from "@/components/auth/messages"

export default function LoginPage() {
  const { setUser } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string>()
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError(undefined)
    try {
      const res = await authApi.login({ email: email.trim(), password })
      setUser(res.user) // GuestGuard then sends the user into the app
    } catch (err) {
      setPassword("")
      setError(toErrorMessage(err, { 401: AUTH_MESSAGES.wrongCredentials }))
    } finally {
      setPending(false)
    }
  }

  return (
    <AuthCard
      title="Log in"
      footer={
        <>
          No account yet?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <Alert variant="destructive">{error}</Alert>}
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={pending}>
          {pending ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </AuthCard>
  )
}
