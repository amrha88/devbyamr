import { ScrollPinnedProjects } from "@/components/ui/scroll-pinned-projects"
import { SectionHeading } from "@/components/sections/section-heading"
import { useLanguage } from "@/lib/i18n"

export function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" className="py-16 sm:py-20">
      <div className="max-w-screen-lg mx-auto px-6">
        <div className="text-center">
          <SectionHeading eyebrow={t("projects.eyebrow")} title={t("projects.title")} />
        </div>
      </div>

      <ScrollPinnedProjects
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
