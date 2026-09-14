import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/sections/section-heading"
import { ARABIC_FONT, useLanguage } from "@/lib/i18n"

const skills = [
  "Java",
  "Python",
  "SQL",
  "JavaScript",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Git",
]

export function About() {
  const { t, isRTL } = useLanguage()

  return (
    <section id="about" className="py-16 sm:py-20 px-6">
      <div className="max-w-screen-md mx-auto">
        <div className="text-center">
          <SectionHeading eyebrow={t("about.eyebrow")} title={t("about.title")} />
        </div>

        <Reveal dir={isRTL ? "rtl" : "ltr"}>
          <div
            className="space-y-5 text-base sm:text-lg leading-relaxed text-neutral-300 text-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl p-6 sm:p-10"
            style={isRTL ? { fontFamily: ARABIC_FONT } : undefined}
          >
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </div>
        </Reveal>

        <Reveal delay={120} dir={isRTL ? "rtl" : "ltr"} className="mt-10 text-center">
          <p
            className="text-sm font-semibold tracking-wide uppercase text-neutral-500 mb-4"
            style={isRTL ? { fontFamily: ARABIC_FONT } : undefined}
          >
            {t("about.tools")}
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
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
