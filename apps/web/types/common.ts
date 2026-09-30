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
