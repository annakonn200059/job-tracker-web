"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import { SelectField } from "@/components/form/select-field"
import {
  useChangeApplicationStage,
  useMoveApplication,
} from "@/hooks/use-applications"
import { STAGE_LABELS } from "@/lib/labels"
import type { Application, ApplicationStage } from "@/types/application"
import type { Vacancy } from "@/types/vacancy"
import { EditApplicationDialog } from "./edit-application-dialog"

interface ApplicationCardProps {
  application: Application
  vacancy?: Vacancy
  /** Neighbours in the same column, used to move the card up/down */
  prevId?: number
  nextId?: number
}

export function ApplicationCard({
  application,
  vacancy,
  prevId,
  nextId,
}: ApplicationCardProps) {
  const changeStage = useChangeApplicationStage()
  const move = useMoveApplication()
  const [editing, setEditing] = useState(false)

  const { id, stage } = application
  const title = vacancy?.title ?? `Vacancy #${application.vacancy_id}`

  return (
    <Card className="flex flex-col gap-2 p-3">
      <Link
        href={`/vacancies/${application.vacancy_id}`}
        className="text-sm font-medium hover:underline"
      >
        {title}
      </Link>
      {vacancy?.location && (
        <p className="text-xs text-muted-foreground">{vacancy.location}</p>
      )}
      <Badge variant="secondary" className="self-start">
        Priority {application.priority}
      </Badge>
      {application.notes && (
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {application.notes}
        </p>
      )}

      <SelectField
        aria-label="Stage"
        value={stage}
        options={STAGE_LABELS}
        disabled={changeStage.isPending}
        onChange={(e) =>
          changeStage.mutate({ id, to: e.target.value as ApplicationStage })
        }
        className="h-8 px-2 text-xs"
      />

      <div className="flex items-center gap-1">
        <Button
          size="sm"
          variant="ghost"
          aria-label="Move up"
          disabled={!prevId || move.isPending}
          onClick={() => move.mutate({ id, stage, before_id: prevId })}
        >
          ↑
        </Button>
        <Button
          size="sm"
          variant="ghost"
          aria-label="Move down"
          disabled={!nextId || move.isPending}
          onClick={() => move.mutate({ id, stage, after_id: nextId })}
        >
          ↓
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="ml-auto"
          onClick={() => setEditing(true)}
        >
          Edit
        </Button>
      </div>

      <EditApplicationDialog
        application={application}
        title={title}
        open={editing}
        onOpenChange={setEditing}
      />
    </Card>
  )
}
