export function FullPageSpinner() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div
        role="status"
        aria-label="Loading"
        className="size-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary"
      />
    </div>
  )
}
