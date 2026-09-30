import { auth } from "@/auth"

export class ApiError extends Error {
  constructor(
    public status: number,
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
  const session = await auth()
  const url = new URL(path, process.env.API_URL)

  // Arrays are sent as comma-separated values: ?stage=saved,applied
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value === undefined) continue
    url.searchParams.set(key, Array.isArray(value) ? value.join(",") : value)
  }

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-User-ID": session?.user.id ?? "",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  })

  if (!res.ok) throw new ApiError(res.status, await res.text())
  if (res.status === 204) return undefined as T
  return res.json()
}
