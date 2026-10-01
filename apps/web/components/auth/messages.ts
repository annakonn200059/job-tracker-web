import { ApiError } from "@/api/client"

export const AUTH_MESSAGES = {
  wrongCredentials:
    "Wrong email or password. If you signed up with Google, use the Google button.",
  network: "Can't reach the server. Check your connection and try again.",
  generic: "Something went wrong. Please try again.",
  googleFailed: "Google sign-in failed. Please try again.",
  googleUnverified: "Your Google account's email isn't verified.",
  googleConflict:
    "This account is already linked to a different Google account.",
  googleCancelled: "Google sign-in was cancelled. You can try again anytime.",
  invalidEmail: "Enter a valid email address.",
  passwordTooShort: "Password must be at least 8 characters.",
  passwordTooLong: "Password is too long (max 72 bytes).",
  passwordMismatch: "Passwords don't match.",
}

/** Picks a message by HTTP status; network and unknown errors get a common one. */
export function toErrorMessage(
  error: unknown,
  byStatus: Partial<Record<number, string>> = {}
) {
  if (error instanceof ApiError) {
    if (error.code === "network_error") return AUTH_MESSAGES.network
    return byStatus[error.status] ?? AUTH_MESSAGES.generic
  }
  return AUTH_MESSAGES.generic
}
