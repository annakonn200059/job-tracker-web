"use client"

import Link from "next/link"
import { ApplicationCard } from "@/components/applications/application-card"
import { QueryStatus } from "@/components/query-status"
import { useApplicationBoard } from "@/hooks/use-applications"
import { useVacancies } from "@/hooks/use-vacancies"
import { STAGE_LABELS } from "@/lib/labels"
import { APPLICATION_STAGES } from "@/types/application"

// Cards only have vacancy_id, so load vacancies to show their titles
const VACANCIES_FOR_TITLES = { limit: 100 }

export default function BoardPage() {
  const board = useApplicationBoard()
  const vacancies = useVacancies(VACANCIES_FOR_TITLES)
  const vacancyById = new Map(vacancies.data?.items?.map((v) => [v.id, v]))

  const isEmpty =
    board.data &&
    APPLICATION_STAGES.every((stage) => !board.data[stage]?.length)

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl font-bold">Board</h1>
      <QueryStatus isPending={board.isPending} error={board.error} />

      {isEmpty && (
        <p className="text-muted-foreground">
          Your board is empty. Open a{" "}
          <Link href="/vacancies" className="text-primary hover:underline">
            vacancy
          </Link>{" "}
          and click “Add to board”.
        </p>
      )}

      {board.data && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {APPLICATION_STAGES.map((stage) => {
            const cards = [...(board.data[stage] ?? [])].sort(
              (a, b) => a.board_order - b.board_order
            )
            return (
              <section
                key={stage}
                className="flex w-64 shrink-0 flex-col gap-3 rounded-2xl bg-muted/50 p-3"
              >
                <h2 className="flex items-center justify-between text-sm font-semibold">
                  {STAGE_LABELS[stage]}
                  <span className="text-muted-foreground">{cards.length}</span>
                </h2>
                {cards.map((application, i) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                    vacancy={vacancyById.get(application.vacancy_id)}
                    prevId={cards[i - 1]?.id}
                    nextId={cards[i + 1]?.id}
                  />
                ))}
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
