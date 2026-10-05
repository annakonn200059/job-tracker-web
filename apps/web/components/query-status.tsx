import { Alert } from "@workspace/ui/components/alert"

/** Loading text or error alert for a query; renders nothing once data is there. */
export function QueryStatus({
  isPending,
  error,
}: {
  isPending: boolean
  error: Error | null
}) {
  if (error) return <Alert variant="destructive">{error.message}</Alert>
  if (isPending) return <p className="text-muted-foreground">Loading...</p>
  return null
}
