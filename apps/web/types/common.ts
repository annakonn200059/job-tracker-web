/** e.g. "2026-09-29T10:00:00Z" */
export type DateTime = string

/** e.g. "2026-09-29" */
export type DateOnly = string

export interface Paginated<T> {
  items: T[]
  total: number
}

export interface ListParams {
  limit?: number
  offset?: number
  desc?: boolean
  q?: string
}

export type ApiErrorCode =
  | "validation_failed"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "conflict"
  | "internal_error"
  | "network_error"

export interface ApiErrorBody {
  error: ApiErrorCode
  message: string
}
