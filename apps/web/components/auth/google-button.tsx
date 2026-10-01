"use client"

import { useState } from "react"
import { GoogleLogin } from "@react-oauth/google"
import { cn } from "@workspace/ui/lib/utils"
import { authApi } from "@/api/auth"
import { AUTH_MESSAGES, toErrorMessage } from "./messages"
import { useAuth } from "./auth-provider"

export function GoogleButton() {
  const { setUser } = useAuth()
  const [message, setMessage] = useState<{ text: string; isError: boolean }>()

  async function handleCredential(credential?: string) {
    setMessage(undefined)
    if (!credential) {
      setMessage({ text: AUTH_MESSAGES.googleFailed, isError: true })
      return
    }
    try {
      const res = await authApi.google({ id_token: credential })
      setUser(res.user)
    } catch (error) {
      const text = toErrorMessage(error, {
        401: AUTH_MESSAGES.googleFailed,
        400: AUTH_MESSAGES.googleUnverified,
        409: AUTH_MESSAGES.googleConflict,
      })
      setMessage({ text, isError: true })
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <GoogleLogin
        text="continue_with"
        onSuccess={({ credential }) => void handleCredential(credential)}
        onError={() =>
          setMessage({ text: AUTH_MESSAGES.googleCancelled, isError: false })
        }
      />
      {message && (
        <p
          className={cn(
            "text-center text-sm",
            message.isError ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {message.text}
        </p>
      )}
    </div>
  )
}
