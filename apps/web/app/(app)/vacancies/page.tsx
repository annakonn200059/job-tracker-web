"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { SelectField } from "@/components/form/select-field"
import { QueryStatus } from "@/components/query-status"
import { VacancyListItem } from "@/components/vacancies/vacancy-list-item"
import { useVacancies } from "@/hooks/use-vacancies"
import { WORK_MODE_LABELS } from "@/lib/labels"
import type { VacancyFilters, WorkMode } from "@/types/vacancy"

const PAGE_SIZE = 50

export default function VacanciesPage() {
  const [filters, setFilters] = useState<VacancyFilters>({
    sort: "created_at",
    desc: true,
    limit: PAGE_SIZE,
  })
  const vacancies = useVacancies(filters)
  const items = vacancies.data?.items ?? []

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const workMode = String(data.get("work_mode")) as WorkMode | ""
    setFilters({
      ...filters,
      q: String(data.get("q")).trim() || undefined,
      work_mode: workMode ? [workMode] : undefined,
    })
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Vacancies</h1>
        <Button asChild>
          <Link href="/vacancies/new">New vacancy</Link>
        </Button>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <Input name="q" placeholder="Search..." aria-label="Search" />
        <SelectField
          name="work_mode"
          aria-label="Work mode"
          placeholder="Any work mode"
          options={WORK_MODE_LABELS}
          className="w-44"
        />
        <Button type="submit" variant="secondary">
          Search
        </Button>
      </form>

      <QueryStatus isPending={vacancies.isPending} error={vacancies.error} />

      {vacancies.isSuccess && (
        <>
          <p className="text-sm text-muted-foreground">
            {vacancies.data.total} found
            {vacancies.data.total > items.length && `, showing ${items.length}`}
          </p>
          <div className="flex flex-col gap-3">
            {items.map((vacancy) => (
              <VacancyListItem key={vacancy.id} vacancy={vacancy} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
