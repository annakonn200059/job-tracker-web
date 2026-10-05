import type { operations } from "@/api/schema.gen"
import type { Schemas } from "./common"

export type ApplicationStage = Schemas["Stage"]

/** Board column order. A new backend stage shows up as an error in lib/labels.ts */
export const APPLICATION_STAGES = [
  "saved",
  "applied",
  "screening",
  "interview",
  "final",
  "offer",
  "rejected",
  "withdrawn",
] as const satisfies readonly ApplicationStage[]

export type Application = Schemas["Application"]
export type ApplicationList = Schemas["ApplicationList"]

/** Kanban board: applications grouped by stage */
export type ApplicationBoard = Schemas["Board"]

export type ApplicationFilters = NonNullable<
  operations["listApplications"]["parameters"]["query"]
>

export type CreateApplicationBody = Schemas["ApplyRequest"]

/** Partial update: omitted = unchanged, `notes: null` = cleared */
export type UpdateApplicationRequest = Schemas["UpdateApplicationRequest"]

export type ChangeStageRequest = Schemas["ChangeStageRequest"]

export type MoveApplicationBody = Schemas["MoveRequest"]
