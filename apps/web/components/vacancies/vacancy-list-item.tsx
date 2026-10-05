import Link from "next/link"
import { Badge } from "@workspace/ui/components/badge"
import { Card } from "@workspace/ui/components/card"
import { formatSalary } from "@/lib/format"
import { EMPLOYMENT_TYPE_LABELS, WORK_MODE_LABELS } from "@/lib/labels"
import type { Vacancy } from "@/types/vacancy"

export function VacancyListItem({ vacancy }: { vacancy: Vacancy }) {
  const salary = formatSalary(vacancy)

  return (
    <Link href={`/vacancies/${vacancy.id}`}>
      <Card className="flex flex-col gap-2 p-4 transition-colors hover:border-primary/40">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-medium">{vacancy.title}</h2>
          {vacancy.posted_at && (
            <span className="shrink-0 text-xs text-muted-foreground">
              {vacancy.posted_at.slice(0, 10)}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {vacancy.location && <span>{vacancy.location}</span>}
          {vacancy.work_mode && (
            <Badge variant="secondary">
              {WORK_MODE_LABELS[vacancy.work_mode]}
            </Badge>
          )}
          {vacancy.employment_type && (
            <Badge variant="secondary">
              {EMPLOYMENT_TYPE_LABELS[vacancy.employment_type]}
            </Badge>
          )}
          {salary && <span>{salary}</span>}
        </div>
      </Card>
    </Link>
  )
}
