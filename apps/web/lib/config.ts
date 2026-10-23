// Deliberately not NEXT_PUBLIC_*: those are inlined at build time, so one
// image could never serve two environments.
export interface PublicConfig {
  googleClientId: string
  landingUrl: string
}

let current: PublicConfig = { googleClientId: "", landingUrl: "/login" }

export function setPublicConfig(config: PublicConfig) {
  current = config
}

export function publicConfig(): PublicConfig {
  return current
}
