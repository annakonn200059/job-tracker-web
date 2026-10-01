import type { DateTime } from "./common"

export interface User {
  id: number
  email: string
  display_name: string | null
  locale: string
  email_verified: boolean
  has_password: boolean
}

export interface SessionResponse {
  user: User
  /** Not used in the browser: the session cookie is set automatically */
  token: string
  expires_at: DateTime
}

export interface LoginBody {
  email: string
  password: string
}

export interface RegisterBody extends LoginBody {
  display_name?: string
}

export interface GoogleLoginBody {
  id_token: string
}
