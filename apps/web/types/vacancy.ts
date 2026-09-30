import type { DateOnly, DateTime, ListParams } from "./common"

export const WORK_MODES = ["onsite", "hybrid", "remote"] as const
export type WorkMode = (typeof WORK_MODES)[number]

export const EMPLOYMENT_TYPES = [
  "full_time",
  "part_time",
  "contract",
  "internship",
] as const
export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number]

export const SALARY_PERIODS = ["hour", "day", "month", "year"] as const
export type SalaryPeriod = (typeof SALARY_PERIODS)[number]

/** Body for creating or updating a vacancy */
export interface VacancyBody {
  company_id?: number
  /** Only used on create: finds or creates the company by name */
  company_name?: string
  title: string
  url?: string
  description?: string
  location?: string
  work_mode?: WorkMode
  employment_type?: EmploymentType
  language?: string
  salary_min?: number
  salary_max?: number
  salary_currency?: string
  salary_period?: SalaryPeriod
  source?: string
  posted_at?: DateOnly
}

export interface Vacancy extends Omit<VacancyBody, "company_name"> {
  id: number
  user_id: number
  created_at: DateTime
  updated_at: DateTime
}

export interface VacancyFilters extends ListParams {
  company_id?: number
  salary_from?: number
  has_application?: boolean
  work_mode?: WorkMode[]
  employment_type?: EmploymentType[]
  language?: string[]
  source?: string[]
  sort?: "created_at" | "updated_at" | "posted_at" | "title" | "salary"
}
