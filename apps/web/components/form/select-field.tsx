import { inputVariants } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { cn } from "@workspace/ui/lib/utils"

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** value -> visible text */
  options: Record<string, string>
  label?: string
  /** Adds an empty first option with this text */
  placeholder?: string
}

export function SelectField({
  options,
  label,
  placeholder,
  id,
  className,
  ...props
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <select id={id} className={cn(inputVariants(), className)} {...props}>
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {Object.entries(options).map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </div>
  )
}
