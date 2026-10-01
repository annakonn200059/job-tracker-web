import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { authApi } from "@/api/auth"
import { ApiError } from "@/api/client"
import { QUERY_KEYS } from "@/lib/query-keys"
import { redirectToLanding } from "@/lib/redirect"
import type { SessionResponse, User } from "@/types/user"

type AuthState =
  | { status: "loading" }
  | { status: "authenticated"; user: User }
  | { status: "anonymous" }
  /** /auth/me failed for a reason other than 401 (server down, 500...) */
  | { status: "error" }

/** Current user, or `null` when not signed in. */
async function fetchMe(): Promise<User | null> {
  try {
    return await authApi.me()
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return null
    throw error
  }
}

export function useAuth() {
  const queryClient = useQueryClient()
  const { data, isPending, isError } = useQuery({
    queryKey: QUERY_KEYS.me,
    queryFn: fetchMe,
    staleTime: Infinity,
    retry: false,
  })

  let state: AuthState
  if (isPending) state = { status: "loading" }
  else if (isError) state = { status: "error" }
  else if (data) state = { status: "authenticated", user: data }
  else state = { status: "anonymous" }

  return {
    ...state,
    /** Checks the session again, showing the loading state meanwhile. */
    refresh: () => queryClient.resetQueries({ queryKey: QUERY_KEYS.me }),
    logout: async () => {
      try {
        await authApi.logout()
      } catch {
        // Leave anyway: the full page load below resets everything.
      } finally {
        redirectToLanding({ saveReturnTo: false })
        queryClient.setQueryData(QUERY_KEYS.me, null)
      }
    },
  }
}

/** Stores the signed-in user. GuestGuard then sends them into the app. */
function useSetSession() {
  const queryClient = useQueryClient()
  return (res: SessionResponse) => {
    queryClient.setQueryData(QUERY_KEYS.me, res.user)
  }
}

export function useLogin() {
  return useMutation({ mutationFn: authApi.login, onSuccess: useSetSession() })
}

export function useRegister() {
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: useSetSession(),
  })
}

export function useGoogleSignIn() {
  return useMutation({
    mutationFn: authApi.google,
    onSuccess: useSetSession(),
  })
}
