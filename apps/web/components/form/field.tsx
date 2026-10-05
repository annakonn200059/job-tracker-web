import { Input, type InputProps } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

interface FieldProps extends InputProps {
  id: string
  label: string
  error?: React.ReactNode
}

export function Field({ id, label, error, ...inputProps }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        variant={error ? "error" : "default"}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
