import type { Paginated } from "@/types/common"
import type { Vacancy, VacancyBody, VacancyFilters } from "@/types/vacancy"
import { request } from "./client"
import { ENDPOINTS } from "./endpoints"

const { vacancies } = ENDPOINTS

export const vacanciesApi = {
  list: (filters?: VacancyFilters) =>
    request<Paginated<Vacancy>>(vacancies.root, { query: filters }),

  get: (id: number) => request<Vacancy>(vacancies.byId(id)),

  create: (body: VacancyBody) =>
    request<Vacancy>(vacancies.root, { method: "POST", body }),

  /** Replaces the whole vacancy: fields you leave out are cleared */
  update: (id: number, body: Omit<VacancyBody, "company_name">) =>
    request<Vacancy>(vacancies.byId(id), { method: "PATCH", body }),

  delete: (id: number) =>
    request<void>(vacancies.byId(id), { method: "DELETE" }),

  restore: (id: number) =>
    request<void>(vacancies.restore(id), { method: "POST" }),
}
