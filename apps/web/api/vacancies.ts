import type {
  Vacancy,
  VacancyCreate,
  VacancyFilters,
  VacancyList,
  VacancyPatch,
} from "@/types/vacancy"
import { request } from "./client"
import { ENDPOINTS } from "./endpoints"

const { vacancies } = ENDPOINTS

export const vacanciesApi = {
  list: (filters?: VacancyFilters) =>
    request<VacancyList>(vacancies.root, { query: filters }),

  get: (id: number) => request<Vacancy>(vacancies.byId(id)),

  create: (body: VacancyCreate) =>
    request<Vacancy>(vacancies.root, { method: "POST", body }),

  /** Partial update: omitted fields are kept, `null` clears a field */
  update: (id: number, body: VacancyPatch) =>
    request<Vacancy>(vacancies.byId(id), { method: "PATCH", body }),

  delete: (id: number) =>
    request<void>(vacancies.byId(id), { method: "DELETE" }),

  restore: (id: number) =>
    request<void>(vacancies.restore(id), { method: "POST" }),
}
