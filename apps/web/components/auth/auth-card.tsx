import { GoogleButton } from "./google-button"

interface AuthCardProps {
  title: string
  footer: React.ReactNode
  children: React.ReactNode
}

/** Shared layout for /login and /register: title, form, Google button, footer link. */
export function AuthCard({ title, footer, children }: AuthCardProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-center font-heading text-2xl font-bold">{title}</h1>
      {children}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>
      <GoogleButton />
      <p className="text-center text-sm text-muted-foreground">{footer}</p>
    </div>
  )
}
