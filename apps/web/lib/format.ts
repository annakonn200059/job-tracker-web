import type { Vacancy } from "@/types/vacancy"
import { SALARY_PERIOD_LABELS } from "./labels"

/** e.g. "5000–7000 EUR per month"; null when there's no salary info */
export function formatSalary(vacancy: Vacancy) {
  const { salary_min: min, salary_max: max } = vacancy
  if (min === undefined && max === undefined) return null

  const range =
    min !== undefined && max !== undefined
      ? `${min}–${max}`
      : min !== undefined
        ? `from ${min}`
        : `up to ${max}`
  const period =
    vacancy.salary_period && SALARY_PERIOD_LABELS[vacancy.salary_period]

  return [range, vacancy.salary_currency, period].filter(Boolean).join(" ")
}
