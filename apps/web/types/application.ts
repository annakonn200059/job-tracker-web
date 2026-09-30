import type { DateTime, ListParams } from "./common"

export const APPLICATION_STAGES = [
  "saved",
  "applied",
  "screening",
  "interview",
  "final",
  "offer",
  "rejected",
  "withdrawn",
] as const

export type ApplicationStage = (typeof APPLICATION_STAGES)[number]

export interface Application {
  id: number
  user_id: number
  vacancy_id: number
  stage: ApplicationStage
  board_order: number
  priority: number
  applied_at?: DateTime
  closed_at?: DateTime
  notes?: string
  created_at: DateTime
  updated_at: DateTime
}

/** Kanban board: applications grouped by stage */
export type ApplicationBoard = Partial<Record<ApplicationStage, Application[]>>

export interface ApplicationFilters extends ListParams {
  company_id?: number
  min_priority?: number
  vacancy_id?: number[]
  tag_id?: number[]
  stage?: ApplicationStage[]
  sort?: "board" | "created_at" | "updated_at" | "priority"
}

export interface CreateApplicationBody {
  vacancy_id: number
  stage?: ApplicationStage
}

export interface UpdateApplicationBody {
  priority: number
  notes?: string
}

export interface MoveApplicationBody {
  stage: ApplicationStage
  after_id?: number
  before_id?: number
}
