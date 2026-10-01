"use client"

import { useState } from "react"
import Link from "next/link"
import { Alert } from "@workspace/ui/components/alert"
import { Button } from "@workspace/ui/components/button"
import { AuthCard } from "@/components/auth/auth-card"
import { Field } from "@/components/auth/field"
import { AUTH_MESSAGES, toErrorMessage } from "@/components/auth/messages"
import { useLogin } from "@/hooks/use-auth"

export default function LoginPage() {
  const login = useLogin()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const error =
    login.error &&
    toErrorMessage(login.error, { 401: AUTH_MESSAGES.wrongCredentials })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    login.mutate(
      { email: email.trim(), password },
      { onError: () => setPassword("") }
    )
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
        <Button type="submit" disabled={login.isPending}>
          {login.isPending ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </AuthCard>
  )
}
