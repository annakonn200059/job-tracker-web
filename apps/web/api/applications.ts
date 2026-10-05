import type {
  Application,
  ApplicationBoard,
  ApplicationFilters,
  ApplicationList,
  ApplicationStage,
  ChangeStageRequest,
  CreateApplicationBody,
  MoveApplicationBody,
  UpdateApplicationRequest,
} from "@/types/application"
import { request } from "./client"
import { ENDPOINTS } from "./endpoints"

const { applications } = ENDPOINTS

export const applicationsApi = {
  list: (filters?: ApplicationFilters) =>
    request<ApplicationList>(applications.root, { query: filters }),

  board: () => request<ApplicationBoard>(applications.board),

  get: (id: number) => request<Application>(applications.byId(id)),

  create: (body: CreateApplicationBody) =>
    request<Application>(applications.root, {
      method: "POST",
      body,
    }),

  update: (id: number, body: UpdateApplicationRequest) =>
    request<Application>(applications.byId(id), {
      method: "PATCH",
      body,
    }),

  changeStage: (id: number, to: ApplicationStage) =>
    request<Application>(applications.stage(id), {
      method: "PATCH",
      body: { to } satisfies ChangeStageRequest,
    }),

  move: (id: number, body: MoveApplicationBody) =>
    request<Application>(applications.move(id), {
      method: "POST",
      body,
    }),

  delete: (id: number) =>
    request<void>(applications.byId(id), { method: "DELETE" }),
}
