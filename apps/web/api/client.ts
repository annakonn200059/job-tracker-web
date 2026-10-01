import { API_URL } from "@/lib/config"
import { redirectToLanding } from "@/lib/redirect"
import type { ApiErrorBody, ApiErrorCode } from "@/types/common"
import { AUTH } from "./endpoints"

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: ApiErrorCode,
    message: string
  ) {
    super(message)
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE"
  body?: unknown
  query?: object
}

export async function request<T>(
  path: string,
  { method = "GET", body, query }: RequestOptions = {}
): Promise<T> {
  const url = new URL(path, API_URL)

  // Arrays are sent as comma-separated values: ?stage=saved,applied
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value === undefined) continue
    url.searchParams.set(key, Array.isArray(value) ? value.join(",") : value)
  }

  const hasBody = body !== undefined
  let res: Response
  try {
    res = await fetch(url, {
      method,
      credentials: "include",
      headers: hasBody ? { "Content-Type": "application/json" } : undefined,
      body: hasBody ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError(0, "network_error", "Can't reach the server")
  }

  // Session expired: go to the landing. Auth endpoints handle 401 themselves
  // (e.g. a wrong password must show a form error).
  if (res.status === 401 && !path.startsWith(`${AUTH}/`)) {
    redirectToLanding()
  }

  if (!res.ok) {
    const data: Partial<ApiErrorBody> = await res.json().catch(() => ({}))
    throw new ApiError(
      res.status,
      data.error ?? "internal_error",
      data.message ?? res.statusText
    )
  }

  if (res.status === 204) return undefined as T
  return res.json()
}
