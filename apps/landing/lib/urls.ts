export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? ""
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ""

export const LOGIN_URL = `${APP_URL}/login`
export const REGISTER_URL = `${APP_URL}/register`
export const ME_URL = `${API_URL}/auth/me`
