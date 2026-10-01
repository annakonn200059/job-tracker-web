import { Button } from "@workspace/ui/components/button"
import { Container } from "../layout/Container"
import { REGISTER_URL } from "@/lib/urls"

export function CtaBanner() {
  return (
    <section className="bg-background py-20 sm:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gradient-start to-gradient-end px-8 py-16 text-center sm:px-16 sm:py-20">
          {/* Decorative blobs */}
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <h2 className="mx-auto mb-4 max-w-2xl font-heading text-4xl font-bold text-primary-foreground sm:text-5xl">
              Ready to take control of your job search?
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-primary-foreground/80">
              Join 1,000+ job seekers using Job Tracker to stay organized and land offers faster.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-card text-primary hover:bg-primary-subtle shadow-lg"
              >
                <a href={REGISTER_URL}>Get Started Free</a>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="border border-white/30 text-primary-foreground hover:bg-white/10"
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
