import { ArrowUpRight } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/sections/section-heading"
import { useLanguage } from "@/lib/i18n"

interface Project {
  title: string
  description: string
  tags: string[]
  liveUrl?: string
  repoUrl?: string
}

const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A short description of this project — what it does, the problem it solves, and any interesting technical details worth mentioning.",
    tags: ["React", "TypeScript", "Tailwind"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Project Two",
    description:
      "A short description of this project — what it does, the problem it solves, and any interesting technical details worth mentioning.",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Project Three",
    description:
      "A short description of this project — what it does, the problem it solves, and any interesting technical details worth mentioning.",
    tags: ["Python", "API", "Automation"],
    repoUrl: "#",
  },
  {
    title: "Project Four",
    description:
      "A short description of this project — what it does, the problem it solves, and any interesting technical details worth mentioning.",
    tags: ["React Native", "Mobile"],
    liveUrl: "#",
  },
]

export function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" className="py-24 sm:py-32 px-6">
      <div className="max-w-screen-lg mx-auto">
        <SectionHeading eyebrow={t("projects.eyebrow")} title={t("projects.title")} />

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={i * 100}
              className="group relative rounded-2xl border border-neutral-800 p-6 sm:p-7 transition-colors duration-300 hover:border-neutral-600"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 shrink-0">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      aria-label={`${project.title} repository`}
                      className="p-1.5 rounded-full text-neutral-500 hover:text-white transition-colors"
                    >
                      <GithubIcon className="w-5 h-5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      aria-label={`${project.title} live site`}
                      className="p-1.5 rounded-full text-neutral-500 hover:text-white transition-colors"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-400">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-neutral-900 text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
