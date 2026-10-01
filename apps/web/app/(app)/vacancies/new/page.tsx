"use client"

import { useRouter } from "next/navigation"
import { VacancyForm } from "@/components/vacancies/vacancy-form"
import { useCreateVacancy } from "@/hooks/use-vacancies"

export default function NewVacancyPage() {
  const router = useRouter()
  const create = useCreateVacancy()

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <h1 className="font-heading text-2xl font-bold">New vacancy</h1>
      <VacancyForm
        submitLabel="Create"
        pending={create.isPending}
        error={create.error}
        onSubmit={(body) =>
          create.mutate(body, {
            onSuccess: (vacancy) => router.push(`/vacancies/${vacancy.id}`),
          })
        }
        onCancel={() => router.back()}
      />
    </div>
  )
}
