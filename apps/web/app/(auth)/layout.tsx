import { GuestGuard } from "@/components/auth/guest-guard"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <GuestGuard>
      <main className="flex min-h-svh items-center justify-center p-4">
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </GuestGuard>
  )
}
