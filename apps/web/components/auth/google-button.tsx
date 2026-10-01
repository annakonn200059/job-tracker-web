"use client"

import { useState } from "react"
import { GoogleLogin } from "@react-oauth/google"
import { cn } from "@workspace/ui/lib/utils"
import { useGoogleSignIn } from "@/hooks/use-auth"
import { AUTH_MESSAGES, toErrorMessage } from "./messages"

export function GoogleButton() {
  const signIn = useGoogleSignIn()
  const [cancelled, setCancelled] = useState(false)

  const error =
    signIn.error &&
    toErrorMessage(signIn.error, {
      401: AUTH_MESSAGES.googleFailed,
      400: AUTH_MESSAGES.googleUnverified,
      409: AUTH_MESSAGES.googleConflict,
    })
  const message = error ?? (cancelled ? AUTH_MESSAGES.googleCancelled : null)

  return (
    <div className="flex flex-col items-center gap-2">
      <GoogleLogin
        text="continue_with"
        onSuccess={({ credential }) => {
          setCancelled(false)
          // Without a credential the API answers 401 -> "Google sign-in failed"
          signIn.mutate({ id_token: credential ?? "" })
        }}
        onError={() => {
          signIn.reset()
          setCancelled(true)
        }}
      />
      {message && (
        <p
          className={cn(
            "text-center text-sm",
            error ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {message}
        </p>
      )}
    </div>
  )
}
