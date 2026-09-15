import { Reveal } from "@/components/ui/reveal"
import { Marquee } from "@/components/ui/marquee"
import { ShimmerText } from "@/components/ui/shimmer-text"
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
          <div className="mt-10 sm:mt-14 mx-auto max-w-xl sm:max-w-2xl">
            <div className="space-y-6 text-base sm:text-lg leading-loose border-s-2 border-[#C3E41D]/30 ps-6 sm:ps-8">
              <ShimmerText
                className="text-neutral-300"
                duration={2.2}
                delay={0.2}
                style={isRTL ? { fontFamily: ARABIC_FONT } : undefined}
              >
                {t("about.p1")}
              </ShimmerText>
              <ShimmerText
                className="text-neutral-400"
                duration={2.2}
                delay={1.6}
                style={isRTL ? { fontFamily: ARABIC_FONT } : undefined}
              >
                {t("about.p2")}
              </ShimmerText>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} dir={isRTL ? "rtl" : "ltr"} className="mt-14 sm:mt-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-8 bg-neutral-800" />
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500"
              style={isRTL ? { fontFamily: ARABIC_FONT } : undefined}
            >
              {t("about.tools")}
            </p>
            <span className="h-px w-8 bg-neutral-800" />
          </div>
          <Marquee
            duration={34}
            direction={isRTL ? "right" : "left"}
            pauseOnHover
            fadeAmount={15}
          >
            {[...skills, ...skills].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="mx-3 sm:mx-4 flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-neutral-400 tracking-wide whitespace-nowrap"
                style={isRTL ? { fontFamily: ARABIC_FONT } : undefined}
              >
                {skill}
                <span className="text-neutral-700">·</span>
              </span>
            ))}
          </Marquee>
        </Reveal>
      </div>
    </section>
  )
}
