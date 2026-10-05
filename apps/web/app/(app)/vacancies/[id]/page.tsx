"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Alert } from "@workspace/ui/components/alert"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { QueryStatus } from "@/components/query-status"
import { VacancyForm } from "@/components/vacancies/vacancy-form"
import { useApplications, useCreateApplication } from "@/hooks/use-applications"
import {
  useDeleteVacancy,
  useRestoreVacancy,
  useUpdateVacancy,
  useVacancy,
} from "@/hooks/use-vacancies"
import { formatSalary } from "@/lib/format"
import {
  EMPLOYMENT_TYPE_LABELS,
  STAGE_LABELS,
  WORK_MODE_LABELS,
} from "@/lib/labels"

export default function VacancyPage() {
  const id = Number(useParams<{ id: string }>().id)
  const vacancy = useVacancy(id)
  const applications = useApplications({ vacancy_id: [id] })
  const application = applications.data?.items?.[0]

  const update = useUpdateVacancy()
  const remove = useDeleteVacancy()
  const restore = useRestoreVacancy()
  const track = useCreateApplication()
  const [editing, setEditing] = useState(false)

  if (remove.isSuccess) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <Alert>This vacancy was deleted.</Alert>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            disabled={restore.isPending}
            onClick={() =>
              restore.mutate(id, { onSuccess: () => remove.reset() })
            }
          >
            Undo
          </Button>
          <Button asChild variant="ghost">
            <Link href="/vacancies">Back to vacancies</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!vacancy.data) {
    return (
      <div className="mx-auto max-w-3xl">
        <QueryStatus isPending={vacancy.isPending} error={vacancy.error} />
      </div>
    )
  }

  const v = vacancy.data
  const salary = formatSalary(v)

  if (editing) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <h1 className="font-heading text-2xl font-bold">Edit vacancy</h1>
        <VacancyForm
          vacancy={v}
          submitLabel="Save"
          pending={update.isPending}
          error={update.error}
          onSubmit={(body) =>
            update.mutate(
              // Full replace: keep the company that's already linked
              { ...body, id, company_id: v.company_id },
              { onSuccess: () => setEditing(false) }
            )
          }
          onCancel={() => setEditing(false)}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link
        href="/vacancies"
        className="text-sm text-muted-foreground hover:underline"
      >
        ← Vacancies
      </Link>

      <div className="flex items-start justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold">{v.title}</h1>
        <div className="flex shrink-0 gap-2">
          <Button variant="secondary" onClick={() => setEditing(true)}>
            Edit
          </Button>
          <Button
            variant="ghost"
            disabled={remove.isPending}
            onClick={() => remove.mutate(id)}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* e.g. 409: a vacancy that's on the board can't be deleted */}
      {remove.error && (
        <Alert variant="destructive">{remove.error.message}</Alert>
      )}

      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {v.location && <span>{v.location}</span>}
        {v.work_mode && (
          <Badge variant="secondary">{WORK_MODE_LABELS[v.work_mode]}</Badge>
        )}
        {v.employment_type && (
          <Badge variant="secondary">
            {EMPLOYMENT_TYPE_LABELS[v.employment_type]}
          </Badge>
        )}
        {salary && <span>{salary}</span>}
        {v.language && <span>Language: {v.language}</span>}
        {v.source && <span>Source: {v.source}</span>}
        {v.posted_at && <span>Posted {v.posted_at.slice(0, 10)}</span>}
      </div>

      {v.url && (
        <a
          href={v.url}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-primary hover:underline"
        >
          Open job posting ↗
        </a>
      )}

      {application ? (
        <Alert>
          On your board: <strong>{STAGE_LABELS[application.stage]}</strong>.{" "}
          <Link href="/" className="text-primary hover:underline">
            Open board
          </Link>
        </Alert>
      ) : (
        applications.isSuccess && (
          <div className="flex items-center gap-3">
            <Button
              disabled={track.isPending}
              onClick={() => track.mutate({ vacancy_id: id })}
            >
              Add to board
            </Button>
            {track.error && (
              <span className="text-sm text-destructive">
                {track.error.message}
              </span>
            )}
          </div>
        )
      )}

      {v.description && (
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {v.description}
        </p>
      )}
    </div>
  )
}
