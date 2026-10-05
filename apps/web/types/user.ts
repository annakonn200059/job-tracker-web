import type { Schemas } from "./common"

export type User = Schemas["User"]

/** `token` is not used in the browser: the session cookie is set automatically */
export type SessionResponse = Schemas["Session"]

export type LoginBody = Schemas["LoginRequest"]
export type RegisterBody = Schemas["RegisterRequest"]
export type GoogleLoginBody = Schemas["GoogleLoginRequest"]
