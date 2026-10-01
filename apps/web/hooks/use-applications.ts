import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { applicationsApi } from "@/api/applications"
import { QUERY_KEYS } from "@/lib/query-keys"
import type {
  ApplicationFilters,
  ApplicationStage,
  MoveApplicationBody,
  UpdateApplicationBody,
} from "@/types/application"

const { applications } = QUERY_KEYS

export function useApplications(filters?: ApplicationFilters) {
  return useQuery({
    queryKey: applications.list(filters),
    queryFn: () => applicationsApi.list(filters),
  })
}

export function useApplicationBoard() {
  return useQuery({
    queryKey: applications.board,
    queryFn: applicationsApi.board,
  })
}

export function useApplication(id: number) {
  return useQuery({
    queryKey: applications.detail(id),
    queryFn: () => applicationsApi.get(id),
  })
}

/** After any change, refetch every applications query (list, board, detail). */
function useRefetchApplications() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: applications.all })
}

export function useCreateApplication() {
  return useMutation({
    mutationFn: applicationsApi.create,
    onSuccess: useRefetchApplications(),
  })
}

export function useUpdateApplication() {
  return useMutation({
    mutationFn: ({ id, ...body }: { id: number } & UpdateApplicationBody) =>
      applicationsApi.update(id, body),
    onSuccess: useRefetchApplications(),
  })
}

export function useChangeApplicationStage() {
  return useMutation({
    mutationFn: ({ id, to }: { id: number; to: ApplicationStage }) =>
      applicationsApi.changeStage(id, to),
    onSuccess: useRefetchApplications(),
  })
}

export function useMoveApplication() {
  return useMutation({
    mutationFn: ({ id, ...body }: { id: number } & MoveApplicationBody) =>
      applicationsApi.move(id, body),
    onSuccess: useRefetchApplications(),
  })
}

export function useDeleteApplication() {
  return useMutation({
    mutationFn: applicationsApi.delete,
    onSuccess: useRefetchApplications(),
  })
}
