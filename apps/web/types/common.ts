import type { components } from "@/api/schema.gen"

/** Types generated from the backend's OpenAPI spec (`npm run gen:api`) */
export type Schemas = components["schemas"]

export type ApiErrorBody = Schemas["Error"]

/** Error codes from the API, plus "network_error" when the request never reached it */
export type ApiErrorCode = ApiErrorBody["error"] | "network_error"
