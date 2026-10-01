"use client"

import { useState } from "react"
import Link from "next/link"
import { Alert } from "@workspace/ui/components/alert"
import { Button } from "@workspace/ui/components/button"
import { authApi } from "@/api/auth"
import { ApiError } from "@/api/client"
import { AuthCard } from "@/components/auth/auth-card"
import { useAuth } from "@/components/auth/auth-provider"
import { Field } from "@/components/auth/field"
import { AUTH_MESSAGES, toErrorMessage } from "@/components/auth/messages"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 8
const MAX_PASSWORD_BYTES = 72

const EMPTY_FORM = { name: "", email: "", password: "", confirm: "" }
type Form = typeof EMPTY_FORM
type Errors = Partial<Record<keyof Form | "form", React.ReactNode>>

function validate(form: Form): Errors {
  const errors: Errors = {}
  if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = AUTH_MESSAGES.invalidEmail
  }
  if (form.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = AUTH_MESSAGES.passwordTooShort
  } else if (
    new TextEncoder().encode(form.password).length > MAX_PASSWORD_BYTES
  ) {
    errors.password = AUTH_MESSAGES.passwordTooLong
  }
  if (form.confirm !== form.password) {
    errors.confirm = AUTH_MESSAGES.passwordMismatch
  }
  return errors
}

function toServerErrors(error: unknown): Errors {
  if (error instanceof ApiError && error.status === 409) {
    return {
      email: (
        <>
          This email is already registered.{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>{" "}
          instead, or continue with Google.
        </>
      ),
    }
  }
  if (error instanceof ApiError && error.status === 400) {
    if (error.message.includes("email"))
      return { email: AUTH_MESSAGES.invalidEmail }
    if (error.message.includes("password")) return { password: error.message }
  }
  return { form: toErrorMessage(error) }
}

export default function RegisterPage() {
  const { setUser } = useAuth()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState<Errors>({})
  const [pending, setPending] = useState(false)

  const fieldProps = (key: keyof Form) => ({
    id: key,
    value: form[key],
    error: errors[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [key]: e.target.value }),
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const clientErrors = validate(form)
    setErrors(clientErrors)
    if (Object.keys(clientErrors).length > 0) return

    const name = form.name.trim()
    setPending(true)
    try {
      const res = await authApi.register({
        email: form.email.trim(),
        password: form.password,
        ...(name && { display_name: name }),
      })
      setUser(res.user) // GuestGuard then sends the user into the app
    } catch (err) {
      setErrors(toServerErrors(err))
    } finally {
      setPending(false)
    }
  }

  return (
    <AuthCard
      title="Create an account"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {errors.form && <Alert variant="destructive">{errors.form}</Alert>}
        <Field
          label="Name (optional)"
          autoComplete="name"
          {...fieldProps("name")}
        />
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          {...fieldProps("email")}
        />
        <Field
          label="Password"
          type="password"
          autoComplete="new-password"
          {...fieldProps("password")}
        />
        <Field
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          {...fieldProps("confirm")}
        />
        <Button type="submit" disabled={pending}>
          {pending ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthCard>
  )
}
