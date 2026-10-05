import type { operations } from "@/api/schema.gen"
import type { Schemas } from "./common"

export type WorkMode = Schemas["WorkMode"]
export type EmploymentType = Schemas["EmploymentType"]
export type SalaryPeriod = Schemas["SalaryPeriod"]

// A new backend value shows up as an error in lib/labels.ts
export const WORK_MODES = [
  "onsite",
  "hybrid",
  "remote",
] as const satisfies readonly WorkMode[]

export const EMPLOYMENT_TYPES = [
  "full_time",
  "part_time",
  "contract",
  "internship",
] as const satisfies readonly EmploymentType[]

export const SALARY_PERIODS = [
  "hour",
  "day",
  "month",
  "year",
] as const satisfies readonly SalaryPeriod[]

export type Vacancy = Schemas["Vacancy"]
export type VacancyList = Schemas["VacancyList"]

/** Body for POST /vacancies */
export type VacancyCreate = Schemas["VacancyCreate"]

/** Body for PATCH /vacancies/{id}: omitted = unchanged, `null` = cleared */
export type VacancyPatch = Schemas["VacancyPatch"]

export type VacancyFilters = NonNullable<
  operations["listVacancies"]["parameters"]["query"]
>
