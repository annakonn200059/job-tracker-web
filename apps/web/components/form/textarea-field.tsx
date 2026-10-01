import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label: string
}

export function TextareaField({ id, label, ...props }: TextareaFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} {...props} />
    </div>
  )
}
