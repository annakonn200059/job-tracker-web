"use client"

import { Alert } from "@workspace/ui/components/alert"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Field } from "@/components/form/field"
import { TextareaField } from "@/components/form/textarea-field"
import {
  useDeleteApplication,
  useUpdateApplication,
} from "@/hooks/use-applications"
import type { Application } from "@/types/application"

interface EditApplicationDialogProps {
  application: Application
  title: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditApplicationDialog({
  application,
  title,
  open,
  onOpenChange,
}: EditApplicationDialogProps) {
  const update = useUpdateApplication()
  const remove = useDeleteApplication()
  const close = () => onOpenChange(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    update.mutate(
      {
        id: application.id,
        priority: Number(data.get("priority")),
        // Empty textarea clears the notes (null), instead of saving ""
        notes: String(data.get("notes")).trim() || null,
      },
      { onSuccess: close }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {(update.error ?? remove.error) && (
            <Alert variant="destructive">
              {(update.error ?? remove.error)?.message}
            </Alert>
          )}
          <Field
            id="priority"
            name="priority"
            label="Priority"
            type="number"
            step={1}
            required
            defaultValue={application.priority}
          />
          <TextareaField
            id="notes"
            name="notes"
            label="Notes"
            rows={4}
            defaultValue={application.notes}
          />
          <DialogFooter className="flex justify-between gap-2 sm:justify-between">
            <Button
              type="button"
              variant="destructive"
              disabled={remove.isPending}
              onClick={() =>
                remove.mutate(application.id, { onSuccess: close })
              }
            >
              Remove from board
            </Button>
            <Button type="submit" disabled={update.isPending}>
              {update.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
