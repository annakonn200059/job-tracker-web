import type { ApplicationFilters } from "@/types/application"
import type { VacancyFilters } from "@/types/vacancy"

const APPLICATIONS = "applications"
const VACANCIES = "vacancies"

export const QUERY_KEYS = {
  me: ["auth", "me"],
  applications: {
    all: [APPLICATIONS],
    list: (filters?: ApplicationFilters) => [APPLICATIONS, "list", filters],
    board: [APPLICATIONS, "board"],
    detail: (id: number) => [APPLICATIONS, id],
  },
  vacancies: {
    all: [VACANCIES],
    list: (filters?: VacancyFilters) => [VACANCIES, "list", filters],
    detail: (id: number) => [VACANCIES, id],
  },
} as const
