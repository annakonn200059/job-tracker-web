import { Button } from "@workspace/ui/components/button"
import { REGISTER_URL } from "@/lib/urls"
import { Container } from "../layout/Container"

const kanbanColumns = [
  {
    label: "Applied",
    count: 5,
    dot: "bg-border",
    cards: [
      { initials: "G", gradient: "from-primary/60 to-primary/90", company: "Google", role: "SWE II", date: "Mar 28" },
      { initials: "A", gradient: "from-accent/50 to-accent/80", company: "Amazon", role: "Product Mgr", date: "Apr 1" },
    ],
  },
  {
    label: "Screen",
    count: 3,
    dot: "bg-primary/50",
    cards: [
      { initials: "S", gradient: "from-gradient-start to-gradient-end", company: "Stripe", role: "Engineer", date: "Apr 3" },
    ],
  },
  {
    label: "Interview",
    count: 2,
    dot: "bg-accent/70",
    cards: [
      {
        initials: "L",
        gradient: "from-gradient-start to-gradient-end",
        company: "Linear",
        role: "Sr. Designer",
        date: "Apr 5",
        featured: true,
      },
    ],
  },
  {
    label: "Offer",
    count: 1,
    dot: "bg-primary/30",
    cards: [
      { initials: "F", gradient: "from-accent/60 to-gradient-end", company: "Figma", role: "Design Lead", date: "Apr 8" },
    ],
  },
]

const avatars = ["MK", "SR", "JP", "AL"]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">

      {/* Aurora orbs — warm color washes at very low opacity */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[800px] w-[800px] rounded-full bg-gradient-start/10 blur-[140px]" />
        <div className="absolute -right-20 top-1/4 h-[650px] w-[650px] rounded-full bg-gradient-end/8 blur-[130px]" />
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-primary-subtle/70 blur-[110px]" />
      </div>

      <Container className="relative py-24 sm:py-28 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12 xl:gap-20">

          {/* ── Left: copy ── */}
          <div className="flex flex-col">

            {/* Badge */}
            <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary-subtle px-4 py-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span className="text-sm font-medium text-primary">
                Beta — free for early adopters
              </span>
            </div>

            {/* Headline — italic monospaced accent creates typographic depth */}
            <h1 className="mb-6 text-[3.25rem] font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4rem] xl:text-[4.5rem]">
              Track your<br />
              job search<br />
              <span className="bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text font-heading italic text-transparent">
                smarter.
              </span>
            </h1>

            {/* Subtext */}
            <p className="mb-10 max-w-[26rem] text-lg leading-relaxed text-muted-foreground">
              Stop losing track of applications. One board, AI coaching, and sharp analytics — so you land the offer.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <a href={REGISTER_URL}>Get Started Free</a>
              </Button>
              {/* Dark border on light bg — hover is clearly visible, no blend-in */}
              <Button
                size="lg"
                variant="ghost"
                className="border border-foreground/15 text-foreground hover:border-foreground/25 hover:bg-foreground/5"
              >
                Watch a Demo
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-4 w-4 fill-accent text-accent" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">4.9</span>
                <span className="text-sm text-muted-foreground">from 200+ reviews</span>
              </div>

              <div className="hidden h-4 w-px bg-border sm:block" />

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {avatars.map((initials, i) => (
                    <div
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-gradient-start to-gradient-end text-[10px] font-bold text-primary-foreground"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">1,000+</span> job seekers
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: product mockup ── */}
          <div className="relative">

            {/* Floating notification — breaks out of the window for visual depth */}
            <div className="absolute -left-4 -top-5 z-20 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg shadow-foreground/5 sm:-left-8">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gradient-start to-gradient-end">
                <span className="text-xs font-bold text-primary-foreground">S</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground">Interview at Stripe</p>
                <p className="text-xs text-muted-foreground">Tomorrow · 2:00 PM</p>
              </div>
              <div className="ml-1 h-2 w-2 shrink-0 rounded-full bg-green-400" />
            </div>

            {/* Browser window */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/8 ring-1 ring-border/50">

              {/* Chrome bar */}
              <div className="flex items-center gap-3 border-b border-border bg-muted px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                  <div className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                  <div className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                </div>
                <div className="flex flex-1 justify-center">
                  <div className="rounded-md bg-background px-4 py-1 text-xs text-muted-foreground/70">
                    app.jobtracker.io/board
                  </div>
                </div>
              </div>

              {/* Board */}
              <div className="bg-muted/30 p-4">

                {/* Toolbar */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">My Job Search</span>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-20 rounded-md bg-border/50" />
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-gradient-start to-gradient-end">
                      <svg className="h-3 w-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Kanban columns */}
                <div className="grid grid-cols-4 gap-2">
                  {kanbanColumns.map((col) => (
                    <div key={col.label} className="flex flex-col gap-2">

                      {/* Column header */}
                      <div className="flex items-center justify-between px-0.5 pb-1">
                        <div className="flex items-center gap-1.5">
                          <div className={`h-1.5 w-1.5 rounded-full ${col.dot}`} />
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {col.label}
                          </span>
                        </div>
                        <span className="text-[10px] tabular-nums text-muted-foreground/60">
                          {col.count}
                        </span>
                      </div>

                      {/* Cards */}
                      {col.cards.map((card, ci) => (
                        <div
                          key={ci}
                          className={`rounded-xl border bg-card p-2.5 ${
                            "featured" in card && card.featured
                              ? "border-primary/35 shadow-sm shadow-primary/10 ring-1 ring-primary/10"
                              : "border-border/50"
                          }`}
                        >
                          <div className="mb-2 flex items-center gap-1.5">
                            <div
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gradient-to-br text-[8px] font-bold text-primary-foreground ${card.gradient}`}
                            >
                              {card.initials}
                            </div>
                            <span className="truncate text-[11px] font-medium text-foreground">
                              {card.company}
                            </span>
                          </div>
                          <p className="mb-2 line-clamp-1 text-[10px] leading-tight text-muted-foreground">
                            {card.role}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] text-muted-foreground/50">{card.date}</span>
                            {"featured" in card && card.featured && (
                              <span className="rounded-full bg-primary-subtle px-1.5 py-0.5 text-[8px] font-semibold text-primary">
                                Active
                              </span>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Add card placeholder */}
                      <div className="rounded-xl border border-dashed border-border/35 py-2.5 text-center text-[10px] text-muted-foreground/35">
                        + Add
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  )
}
