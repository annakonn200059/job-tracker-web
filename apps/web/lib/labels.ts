import type { ApplicationStage } from "@/types/application"
import type { EmploymentType, SalaryPeriod, WorkMode } from "@/types/vacancy"

export const STAGE_LABELS: Record<ApplicationStage, string> = {
  saved: "Saved",
  applied: "Applied",
  screening: "Screening",
  interview: "Interview",
  final: "Final",
  offer: "Offer",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
}

export const WORK_MODE_LABELS: Record<WorkMode, string> = {
  onsite: "On-site",
  hybrid: "Hybrid",
  remote: "Remote",
}

export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  internship: "Internship",
}

export const SALARY_PERIOD_LABELS: Record<SalaryPeriod, string> = {
  hour: "per hour",
  day: "per day",
  month: "per month",
  year: "per year",
}
