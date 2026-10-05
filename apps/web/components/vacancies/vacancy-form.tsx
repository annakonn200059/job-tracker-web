"use client"

import { Alert } from "@workspace/ui/components/alert"
import { Button } from "@workspace/ui/components/button"
import { Field } from "@/components/form/field"
import { SelectField } from "@/components/form/select-field"
import { TextareaField } from "@/components/form/textarea-field"
import {
  EMPLOYMENT_TYPE_LABELS,
  SALARY_PERIOD_LABELS,
  WORK_MODE_LABELS,
} from "@/lib/labels"
import type {
  EmploymentType,
  SalaryPeriod,
  Vacancy,
  VacancyCreate,
  VacancyPatch,
  WorkMode,
} from "@/types/vacancy"

interface CommonProps {
  submitLabel: string
  pending: boolean
  error: Error | null
  onCancel?: () => void
}

type VacancyFormProps = CommonProps &
  (
    | { vacancy?: undefined; onSubmit: (body: VacancyCreate) => void }
    | { vacancy: Vacancy; onSubmit: (body: VacancyPatch) => void }
  )

const text = (data: FormData, key: string) =>
  String(data.get(key) ?? "").trim() || null

/**
 * Every editable field; empty inputs become `null`. Sent as-is on edit, so
 * clearing an input clears the field (PATCH: omitted = kept, null = cleared).
 */
function toPatch(data: FormData) {
  const number = (key: string) => {
    const value = text(data, key)
    return value === null ? null : Number(value)
  }

  return {
    title: text(data, "title") ?? "",
    url: text(data, "url"),
    description: text(data, "description"),
    location: text(data, "location"),
    work_mode: text(data, "work_mode") as WorkMode | null,
    employment_type: text(data, "employment_type") as EmploymentType | null,
    language: text(data, "language"),
    salary_min: number("salary_min"),
    salary_max: number("salary_max"),
    salary_currency: text(data, "salary_currency"),
    salary_period: text(data, "salary_period") as SalaryPeriod | null,
    source: text(data, "source"),
    posted_at: text(data, "posted_at"),
  } satisfies VacancyPatch
}

/** Same fields as edit, but empty ones are left out. */
function toCreate(data: FormData): VacancyCreate {
  const fields = { ...toPatch(data), company_name: text(data, "company_name") }
  const body: Partial<typeof fields> = {}
  for (const key of Object.keys(fields) as (keyof typeof fields)[]) {
    if (fields[key] !== null) Object.assign(body, { [key]: fields[key] })
  }
  return { ...body, title: fields.title }
}

export function VacancyForm(props: VacancyFormProps) {
  const { vacancy, submitLabel, pending, error, onCancel } = props

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (props.vacancy) props.onSubmit(toPatch(data))
    else props.onSubmit(toCreate(data))
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <Alert variant="destructive">{error.message}</Alert>}

      <Field
        id="title"
        name="title"
        label="Title"
        required
        defaultValue={vacancy?.title}
      />
      {/* The company can only be set by name when creating */}
      {!vacancy && (
        <Field id="company_name" name="company_name" label="Company" />
      )}
      <Field
        id="url"
        name="url"
        label="Link"
        type="url"
        defaultValue={vacancy?.url}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="location"
          name="location"
          label="Location"
          defaultValue={vacancy?.location}
        />
        <SelectField
          id="work_mode"
          name="work_mode"
          label="Work mode"
          placeholder="—"
          options={WORK_MODE_LABELS}
          defaultValue={vacancy?.work_mode ?? ""}
        />
        <SelectField
          id="employment_type"
          name="employment_type"
          label="Employment type"
          placeholder="—"
          options={EMPLOYMENT_TYPE_LABELS}
          defaultValue={vacancy?.employment_type ?? ""}
        />
        <Field
          id="language"
          name="language"
          label="Language"
          placeholder="en"
          defaultValue={vacancy?.language}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Field
          id="salary_min"
          name="salary_min"
          label="Salary from"
          type="number"
          min={0}
          defaultValue={vacancy?.salary_min}
        />
        <Field
          id="salary_max"
          name="salary_max"
          label="Salary to"
          type="number"
          min={0}
          defaultValue={vacancy?.salary_max}
        />
        <Field
          id="salary_currency"
          name="salary_currency"
          label="Currency"
          placeholder="EUR"
          defaultValue={vacancy?.salary_currency}
        />
        <SelectField
          id="salary_period"
          name="salary_period"
          label="Period"
          placeholder="—"
          options={SALARY_PERIOD_LABELS}
          defaultValue={vacancy?.salary_period ?? ""}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="source"
          name="source"
          label="Source"
          placeholder="LinkedIn"
          defaultValue={vacancy?.source}
        />
        <Field
          id="posted_at"
          name="posted_at"
          label="Posted on"
          type="date"
          defaultValue={vacancy?.posted_at?.slice(0, 10)}
        />
      </div>

      <TextareaField
        id="description"
        name="description"
        label="Description"
        rows={6}
        defaultValue={vacancy?.description}
      />

      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
