import { LANDING_URL } from "./config"

const RETURN_TO_KEY = "auth:returnTo"

// Several requests can fail with 401 at once; only the first one redirects.
let redirecting = false

/** Full page load to the landing, saving the current page to come back to after login. */
export function redirectToLanding({ saveReturnTo = true } = {}) {
  if (redirecting) return
  redirecting = true
  if (saveReturnTo) {
    sessionStorage.setItem(
      RETURN_TO_KEY,
      window.location.pathname + window.location.search
    )
  }
  window.location.assign(LANDING_URL)
}

/** Reads and removes the saved page. Only same-site paths are allowed. */
export function takeReturnTo(fallback = "/") {
  const path = sessionStorage.getItem(RETURN_TO_KEY)
  sessionStorage.removeItem(RETURN_TO_KEY)
  if (
    path?.startsWith("/") &&
    !path.startsWith("//") &&
    !path.startsWith("/\\")
  ) {
    return path
  }
  return fallback
}
