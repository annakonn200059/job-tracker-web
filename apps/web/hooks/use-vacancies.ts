import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { vacanciesApi } from "@/api/vacancies"
import { QUERY_KEYS } from "@/lib/query-keys"
import type { VacancyFilters, VacancyPatch } from "@/types/vacancy"

const { vacancies } = QUERY_KEYS

export function useVacancies(filters?: VacancyFilters) {
  return useQuery({
    queryKey: vacancies.list(filters),
    queryFn: () => vacanciesApi.list(filters),
    // Keep showing the old results while new filters load
    placeholderData: keepPreviousData,
  })
}

export function useVacancy(id: number) {
  return useQuery({
    queryKey: vacancies.detail(id),
    queryFn: () => vacanciesApi.get(id),
  })
}

/** After any change, refetch every vacancies query (list and detail). */
function useRefetchVacancies() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: vacancies.all })
}

export function useCreateVacancy() {
  return useMutation({
    mutationFn: vacanciesApi.create,
    onSuccess: useRefetchVacancies(),
  })
}

export function useUpdateVacancy() {
  return useMutation({
    mutationFn: ({ id, ...body }: { id: number } & VacancyPatch) =>
      vacanciesApi.update(id, body),
    onSuccess: useRefetchVacancies(),
  })
}

export function useDeleteVacancy() {
  return useMutation({
    mutationFn: vacanciesApi.delete,
    onSuccess: useRefetchVacancies(),
  })
}

export function useRestoreVacancy() {
  return useMutation({
    mutationFn: vacanciesApi.restore,
    onSuccess: useRefetchVacancies(),
  })
}
