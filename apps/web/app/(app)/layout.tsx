import { AppHeader } from "@/components/app-header"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <AppHeader />
      <main className="p-6">{children}</main>
    </AuthGuard>
  )
}
