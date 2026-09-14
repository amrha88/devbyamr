import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/sections/section-heading"
import { useLanguage } from "@/lib/i18n"

interface Job {
  role: string
  company: string
  period: string
  description: string
}

const jobs: Job[] = [
  {
    role: "Software Developer",
    company: "Company Name",
    period: "2024 — Present",
    description:
      "Describe what you did here — what you built, technologies used, and impact you had.",
  },
  {
    role: "Junior Developer",
    company: "Previous Company",
    period: "2022 — 2024",
    description:
      "Describe what you did here — what you built, technologies used, and impact you had.",
  },
]

export function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="py-24 sm:py-32 px-6">
      <div className="max-w-screen-md mx-auto">
        <SectionHeading eyebrow={t("experience.eyebrow")} title={t("experience.title")} />

        <div className="space-y-10">
          {jobs.map((job, i) => (
            <Reveal
              key={job.role + job.company}
              delay={i * 120}
              className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 border-b border-neutral-800 pb-10 last:border-b-0 last:pb-0"
            >
              <p
                className="text-sm font-medium text-neutral-500"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                {job.period}
              </p>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {job.role}
                  <span className="text-neutral-500 font-medium"> · {job.company}</span>
                </h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-neutral-400">
                  {job.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
