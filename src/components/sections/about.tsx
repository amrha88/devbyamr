import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, FileText } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { Reveal } from "@/components/ui/reveal"
import { Marquee } from "@/components/ui/marquee"
import { SectionHeading } from "@/components/sections/section-heading"
import { ARABIC_FONT, useLanguage, type TranslationKey } from "@/lib/i18n"

const PROJECT_URL = "https://github.com/amrha88/FinalProject"
const PRESENTATION_URL = "/automate-presentation.pdf"

const ACCENT = "#C3E41D"

const quoteKeys: { textKey: TranslationKey; highlightKey: TranslationKey }[] = [
  { textKey: "about.quote1Text", highlightKey: "about.quote1Highlight" },
  { textKey: "about.quote2Text", highlightKey: "about.quote2Highlight" },
  { textKey: "about.quote3Text", highlightKey: "about.quote3Highlight" },
  { textKey: "about.quote4Text", highlightKey: "about.quote4Highlight" },
  { textKey: "about.quote5Text", highlightKey: "about.quote5Highlight" },
]

function QuoteRotator({
  quotes,
}: {
  quotes: { text: string; highlight: string }[]
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % quotes.length), 7200)
    return () => clearInterval(id)
  }, [quotes.length])

  return (
    <div className="relative min-h-[6.5rem] sm:min-h-[4.5rem]">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg font-bold leading-snug text-white"
        >
          {quotes[index].text} <span style={{ color: ACCENT }}>{quotes[index].highlight}</span>
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

const skills = [
  "Java",
  "Python",
  "SQL",
  "HTML",
  "CSS",
  "Kotlin",
  "JavaScript",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Machine learning",
  "Agents",
  "AWS Services",
  "Github",
  "Microsoft office",
  "RAG",
]

const brands = [
  { name: "Locanda", src: "/Locanda-logo.png", className: "h-6 sm:h-7", monochrome: true },
  { name: "chefalaa.co.il", src: "/chef's-logo.png", className: "h-10 sm:h-12", monochrome: true },
  { name: "Rotary Club Nazareth", src: "/rotary-logo.png", className: "h-16 sm:h-20 rounded-xl" },
]

const stats: { value: string; labelKey: TranslationKey }[] = [
  { value: "3+", labelKey: "about.statYears" },
  { value: "4+", labelKey: "about.statProjects" },
  { value: "87", labelKey: "about.statGpa" },
  { value: "3", labelKey: "about.statLanguages" },
]

const timeline: { titleKey: TranslationKey; subtitleKey: TranslationKey; active?: boolean }[] = [
  { titleKey: "about.path4Title", subtitleKey: "about.path4Subtitle" },
  { titleKey: "about.path2Title", subtitleKey: "about.path2Subtitle" },
  { titleKey: "about.path3Title", subtitleKey: "about.path3Subtitle" },
  { titleKey: "about.path5Title", subtitleKey: "about.path5Subtitle" },
  { titleKey: "about.path1Title", subtitleKey: "about.path1Subtitle", active: true },
]

export function About() {
  const { t, isRTL } = useLanguage()
  const arabicStyle = isRTL ? { fontFamily: ARABIC_FONT } : undefined
  const bodyFontStyle = isRTL ? { fontFamily: ARABIC_FONT } : undefined

  return (
    <section id="about" className="py-16 sm:py-20 px-6">
      <div className="max-w-screen-lg mx-auto">
        <div className="text-center">
          <SectionHeading eyebrow={t("about.eyebrow")} title={t("about.title")} />
        </div>

        <div style={bodyFontStyle}>
          <Reveal dir={isRTL ? "rtl" : "ltr"}>
            <p className="mt-10 sm:mt-14 mx-auto max-w-2xl text-center text-base sm:text-lg leading-relaxed text-neutral-300">
              {t("about.intro")}
            </p>
          </Reveal>

          <div className="mt-14 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
            <Reveal dir={isRTL ? "rtl" : "ltr"}>
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-8"
                style={{ color: ACCENT }}
              >
                {t("about.pathEyebrow")}
              </p>
              <div className="relative ps-8">
                <div className="absolute start-[7px] top-2 bottom-2 w-px bg-white/15" />
                <div className="space-y-8">
                  {timeline.map((step, i) => (
                    <Reveal key={step.titleKey} delay={80 + i * 70} y={12} blur={false} className="relative">
                      <span
                        className="absolute -start-8 top-1 w-4 h-4 rounded-full border-2"
                        style={
                          step.active
                            ? { backgroundColor: ACCENT, borderColor: ACCENT }
                            : { backgroundColor: "black", borderColor: "rgba(255,255,255,0.3)" }
                        }
                      />
                      <h4 className="font-bold text-white">{t(step.titleKey)}</h4>
                      <p className="text-sm text-neutral-400 mt-1">{t(step.subtitleKey)}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={140} dir={isRTL ? "rtl" : "ltr"}>
              <div className="h-full flex flex-col justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl p-8 sm:p-10">
                <p
                  className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                  style={{ color: ACCENT }}
                >
                  {t("about.projectEyebrow")}
                </p>
                <h4 className="text-3xl sm:text-4xl font-black text-white">{t("about.projectTitle")}</h4>
                <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-sm">
                  {t("about.projectSubtitle")}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href={PROJECT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-sm font-semibold hover:opacity-80 transition-opacity duration-300"
                    style={{ color: ACCENT }}
                  >
                    <GithubIcon className="w-4 h-4" />
                    {t("about.viewOnGithub")}
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                  <a
                    href={PRESENTATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link2 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-300 hover:text-white transition-colors duration-300"
                  >
                    <FileText className="w-4 h-4" />
                    {t("about.viewPresentation")}
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link2:translate-x-0.5 group-hover/link2:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-6 items-stretch">
            <Reveal delay={180} dir={isRTL ? "rtl" : "ltr"}>
              <div className="h-full flex flex-col justify-center rounded-t-3xl lg:rounded-3xl border border-b-0 lg:border-b border-white/10 bg-white/5 backdrop-blur-md shadow-2xl p-5 sm:p-6">
                <span className="h-px w-8 mb-3 block" style={{ backgroundColor: ACCENT }} />
                <QuoteRotator
                  quotes={quoteKeys.map((q) => ({ text: t(q.textKey), highlight: t(q.highlightKey) }))}
                />
              </div>
            </Reveal>

            <Reveal delay={200} dir={isRTL ? "rtl" : "ltr"}>
              <div className="h-full rounded-b-3xl lg:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl p-5 sm:p-6">
                <p
                  className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                  style={{ color: ACCENT }}
                >
                  {t("about.statsEyebrow")}
                </p>
                <div className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden bg-white/10">
                  {stats.map((stat) => (
                    <div key={stat.labelKey} className="bg-[#0a0a0a] p-3 sm:p-4">
                      <p className="text-2xl sm:text-3xl font-black" style={{ color: ACCENT }}>
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs sm:text-sm text-neutral-400">{t(stat.labelKey)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={220} dir={isRTL ? "rtl" : "ltr"} className="mt-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl py-8 sm:py-10 overflow-hidden">
              <div className="flex flex-col items-center gap-3 mb-7">
                <p
                  className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-neutral-300"
                  style={{ textShadow: "0 0 14px rgba(195,228,29,0.45)", ...arabicStyle }}
                >
                  {t("about.trustedBy")}
                </p>
                <span className="relative h-[3px] w-14 rounded-full" style={{ backgroundColor: ACCENT }}>
                  <span className="absolute inset-0 rounded-full blur-md" style={{ backgroundColor: ACCENT, opacity: 0.7 }} />
                </span>
              </div>
              <Marquee duration={22} direction="right" pauseOnHover fadeAmount={20}>
                {[...brands, ...brands, ...brands].map((brand, i) => (
                  <div key={`${brand.name}-${i}`} className="mx-8 flex items-center justify-center">
                    <img
                      src={brand.src}
                      alt={brand.name}
                      className={`${brand.className} w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300`}
                      style={brand.monochrome ? { filter: "brightness(0) invert(1)" } : undefined}
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </Reveal>

          <Reveal delay={120} dir={isRTL ? "rtl" : "ltr"} className="mt-14 sm:mt-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-px w-8 bg-neutral-800" />
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500"
                style={arabicStyle}
              >
                {t("about.tools")}
              </p>
              <span className="h-px w-8 bg-neutral-800" />
            </div>
            <p className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2 text-sm sm:text-base text-neutral-400 tracking-wide">
              {skills.map((skill, i) => (
                <span key={skill} className="flex items-center gap-3 sm:gap-4 whitespace-nowrap">
                  {skill}
                  {i < skills.length - 1 && <span className="text-neutral-700">·</span>}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
