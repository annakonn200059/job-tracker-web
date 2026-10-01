import type {
  GoogleLoginBody,
  LoginBody,
  RegisterBody,
  SessionResponse,
  User,
} from "@/types/user"
import { request } from "./client"
import { ENDPOINTS } from "./endpoints"

const { auth } = ENDPOINTS

export const authApi = {
  register: (body: RegisterBody) =>
    request<SessionResponse>(auth.register, { method: "POST", body }),

  login: (body: LoginBody) =>
    request<SessionResponse>(auth.login, { method: "POST", body }),

  google: (body: GoogleLoginBody) =>
    request<SessionResponse>(auth.google, { method: "POST", body }),

  logout: () => request<void>(auth.logout, { method: "POST" }),

  me: () => request<User>(auth.me),
}
