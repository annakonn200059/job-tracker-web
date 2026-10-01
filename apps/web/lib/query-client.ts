import { QueryClient } from "@tanstack/react-query"
import { ApiError } from "@/api/client"

const MAX_RETRIES = 2

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 401 is handled in api/client.ts (redirect to the landing).
        // Other 4xx won't fix themselves either, so don't retry them.
        retry: (failureCount, error) => {
          const isClientError =
            error instanceof ApiError &&
            error.status >= 400 &&
            error.status < 500
          return !isClientError && failureCount < MAX_RETRIES
        },
      },
    },
  })
}
