import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/sections/section-heading"
import { ARABIC_FONT, useLanguage } from "@/lib/i18n"

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Python",
  "Git",
]

export function About() {
  const { t, isRTL } = useLanguage()

  return (
    <section id="about" className="py-24 sm:py-32 px-6">
      <div className="max-w-screen-md mx-auto">
        <SectionHeading eyebrow={t("about.eyebrow")} title={t("about.title")} />

        <Reveal
          dir={isRTL ? "rtl" : "ltr"}
          className="space-y-5 text-base sm:text-lg leading-relaxed text-neutral-400"
          style={isRTL ? { fontFamily: ARABIC_FONT, textAlign: "right" } : undefined}
        >
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
        </Reveal>

        <Reveal delay={120} dir={isRTL ? "rtl" : "ltr"} className="mt-10">
          <p
            className="text-sm font-semibold tracking-wide uppercase text-neutral-500 mb-4"
            style={isRTL ? { fontFamily: ARABIC_FONT } : undefined}
          >
            {t("about.tools")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {skills.map((skill, i) => (
              <Reveal key={skill} delay={150 + i * 40} y={12} blur={false} as="span">
                <span className="px-3.5 py-1.5 rounded-full text-sm font-medium border border-neutral-700 text-neutral-300">
                  {skill}
                </span>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
