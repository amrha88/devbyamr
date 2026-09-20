import { useState } from "react"
import { ChevronDown, User } from "lucide-react"
import { BlurText } from "@/components/ui/blur-text"
import { Reveal } from "@/components/ui/reveal"
import { ARABIC_FONT, useLanguage, type TranslationKey } from "@/lib/i18n"

const ACCENT = "#C3E41D"
const PROFILE_SRC = "/assets/profile.jpg"

const focusAreas: TranslationKey[] = ["hero.focus1", "hero.focus2", "hero.focus3", "hero.focus4"]

export function Hero() {
  const [imageFailed, setImageFailed] = useState(false)
  const { t, isRTL } = useLanguage()
  const arabicStyle = isRTL ? { fontFamily: ARABIC_FONT } : undefined
  const roleText = isRTL ? t("hero.role") : t("hero.role").replace(" ", " \n ")

  return (
    <section
      id="home"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative min-h-screen flex items-center px-8 pt-10 sm:pt-24 pb-1 sm:pb-20"
    >
      <div className="max-w-screen-xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10 lg:gap-16 items-center mt-16 sm:mt-0">
        {/* Text */}
        <div className="text-start order-2 lg:order-1 mt-6 sm:mt-0">
          <Reveal y={10}>
            <p
              style={{ color: ACCENT, ...arabicStyle }}
              className="text-sm sm:text-base font-semibold tracking-[0.15em] mb-6 sm:mb-4"
            >
              {t("hero.greeting")}
            </p>
          </Reveal>

          <BlurText
            text={roleText}
            delay={100}
            animateBy="words"
            direction="top"
            dir={isRTL ? "rtl" : "ltr"}
            className="text-5xl min-[375px]:text-6xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight text-white justify-start"
            style={arabicStyle}
          />

          <Reveal delay={200} y={12}>
            <p
              style={arabicStyle}
              className="mt-7 sm:mt-7 max-w-[320px] sm:max-w-md text-sm sm:text-xl leading-snug sm:leading-relaxed text-neutral-400"
            >
              {t("hero.description")}
            </p>
          </Reveal>

          <Reveal delay={350} y={12} className="mt-7 sm:mt-9">
            <div
              dir={isRTL ? "rtl" : "ltr"}
              className="grid grid-cols-2 gap-x-8 sm:gap-x-10 gap-y-12 sm:gap-y-10 max-w-md sm:max-w-lg"
            >
              {focusAreas.map((key, i) => (
                <div key={key} className="text-start">
                  <p className="text-sm font-bold tracking-wide" style={{ color: ACCENT }}>
                    #{String(i + 1).padStart(2, "0")}
                  </p>
                  <p
                    style={{ ...arabicStyle, whiteSpace: !isRTL && i < 3 ? "pre-line" : undefined }}
                    className="mt-1.5 text-base sm:text-base font-semibold text-white leading-snug"
                  >
                    {!isRTL && i < 3 ? t(key).replace(" ", "\n") : t(key)}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Photo frame */}
        <Reveal delay={150} className="order-1 lg:order-2 flex justify-center -mt-20 sm:mt-0">
          <div className="relative w-[160px] h-[200px] min-[375px]:w-[180px] min-[375px]:h-[225px] sm:w-[320px] sm:h-[400px] lg:w-full lg:max-w-[400px] lg:h-[520px] xl:max-w-[460px] xl:h-[580px] rounded-[2rem] overflow-hidden shadow-2xl bg-neutral-900">
            {imageFailed ? (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-1/3 h-1/3 text-neutral-600" strokeWidth={1.5} />
              </div>
            ) : (
              <img
                src={PROFILE_SRC}
                alt="Amr HA"
                className="w-full h-full object-cover"
                onError={() => setImageFailed(true)}
              />
            )}
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
            <div
              className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset"
              style={{ boxShadow: `0 0 0 1px ${ACCENT}33, 0 0 40px -8px ${ACCENT}66` }}
            />
          </div>
        </Reveal>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-colors duration-300"
        aria-label="Scroll to about section"
      >
        <ChevronDown className="animate-scroll-hint w-5 h-5 md:w-8 md:h-8 text-neutral-400 hover:text-white transition-colors duration-300" />
      </a>
    </section>
  )
}
