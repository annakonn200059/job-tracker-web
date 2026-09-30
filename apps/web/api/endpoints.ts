const APPLICATIONS = "/applications"
const VACANCIES = "/vacancies"

export const ENDPOINTS = {
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
