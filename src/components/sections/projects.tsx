import { ProjectShowcase } from "@/components/ui/project-showcase"
import { SectionHeading } from "@/components/sections/section-heading"
import { useLanguage } from "@/lib/i18n"

const ACCENT = "#C3E41D"

export function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" className="py-16 sm:py-20">
      <div className="max-w-screen-lg mx-auto px-6">
        <div className="relative h-px w-full -mt-6 sm:-mt-10 mb-20 sm:mb-24 bg-gradient-to-r from-transparent via-white/15 to-transparent">
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-20 sm:w-28 rounded-full"
            style={{ backgroundColor: ACCENT, boxShadow: `0 0 6px 1px ${ACCENT}` }}
          />
        </div>

        <div className="text-center">
          <SectionHeading eyebrow={t("projects.eyebrow")} title={t("projects.title")} />
        </div>
      </div>

      <ProjectShowcase
        items={[
          {
            videoSrc: "/videos/chef-alaa-mockup-720.mp4",
            title: t("projects.featured.title"),
            description: t("projects.featured.description"),
            bgText: "CHEF ALAA",
            startTime: 6,
          },
          {
            videoSrc: "/videos/locanda-mockup-720.mp4",
            title: t("projects.featured2.title"),
            description: t("projects.featured2.description"),
            bgText: "LOCANDA",
          },
          {
            videoSrc: "/videos/finance-office-mockup-720.mp4",
            title: t("projects.featured3.title"),
            description: t("projects.featured3.description"),
            bgText: "FINANCE CONSULTING OFFICE",
          },
        ]}
      />
    </section>
  )
}
