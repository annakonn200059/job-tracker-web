export const AUTH = "/auth"
const APPLICATIONS = "/applications"
const VACANCIES = "/vacancies"

export const ENDPOINTS = {
  auth: {
    register: `${AUTH}/register`,
    login: `${AUTH}/login`,
    google: `${AUTH}/google`,
    logout: `${AUTH}/logout`,
    me: `${AUTH}/me`,
  },
  applications: {
    root: APPLICATIONS,
    board: `${APPLICATIONS}/board`,
    byId: (id: number) => `${APPLICATIONS}/${id}`,
    stage: (id: number) => `${APPLICATIONS}/${id}/stage`,
    move: (id: number) => `${APPLICATIONS}/${id}/move`,
  },
  vacancies: {
    root: VACANCIES,
    byId: (id: number) => `${VACANCIES}/${id}`,
    restore: (id: number) => `${VACANCIES}/${id}/restore`,
  },
} as const
