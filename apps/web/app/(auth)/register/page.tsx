"use client"

import { useState } from "react"
import Link from "next/link"
import { Alert } from "@workspace/ui/components/alert"
import { Button } from "@workspace/ui/components/button"
import { ApiError } from "@/api/client"
import { AuthCard } from "@/components/auth/auth-card"
import { Field } from "@/components/auth/field"
import { AUTH_MESSAGES, toErrorMessage } from "@/components/auth/messages"
import { useRegister } from "@/hooks/use-auth"

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
  const register = useRegister()
  const [form, setForm] = useState(EMPTY_FORM)
  const [clientErrors, setClientErrors] = useState<Errors>({})

  const errors = register.error ? toServerErrors(register.error) : clientErrors

  const fieldProps = (key: keyof Form) => ({
    id: key,
    value: form[key],
    error: errors[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [key]: e.target.value }),
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    register.reset()
    const newErrors = validate(form)
    setClientErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const name = form.name.trim()
    register.mutate({
      email: form.email.trim(),
      password: form.password,
      ...(name && { display_name: name }),
    })
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
        <Button type="submit" disabled={register.isPending}>
          {register.isPending ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthCard>
  )
}
