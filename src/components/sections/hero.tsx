import { BlurText } from "@/components/ui/blur-text"
import { Reveal } from "@/components/ui/reveal"
import { ARABIC_FONT, useLanguage, type TranslationKey } from "@/lib/i18n"

const ACCENT = "#C3E41D"
const PORTRAIT_SRCSET = "/assets/hero/portrait-800.jpg 800w, /assets/hero/portrait-1400.jpg 1400w"

const focusAreas: TranslationKey[] = ["hero.focus1", "hero.focus2", "hero.focus3", "hero.focus4"]

export function Hero() {
  const { t, isRTL } = useLanguage()
  const arabicStyle = isRTL ? { fontFamily: ARABIC_FONT } : undefined
  const roleText = isRTL ? t("hero.role") : t("hero.role").replace(" ", " \n ")

  return (
    <section
      id="home"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden lg:min-h-dvh flex items-center px-8 pt-16 lg:pt-24 pb-10 sm:pb-20"
    >
      {/* Background portrait: full-width top on mobile/tablet, side panel on desktop */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[66svh] sm:h-[88svh] lg:inset-x-auto lg:inset-y-0 lg:h-auto lg:w-[55%] ${
          isRTL ? "lg:left-0" : "lg:right-0"
        }`}
      >
        <img
          src="/assets/hero/portrait-800.jpg"
          srcSet={PORTRAIT_SRCSET}
          sizes="(min-width: 1024px) 55vw, 100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[50%_22%] brightness-[0.95] contrast-[1.05]"
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black via-black/60 to-transparent lg:h-1/4" />
        <div
          className={`absolute inset-y-0 hidden lg:block w-2/5 from-black via-black/40 to-transparent ${
            isRTL ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r"
          }`}
        />
      </div>

      <div className="relative max-w-screen-xl mx-auto w-full mt-[30svh] sm:mt-[56svh] lg:mt-0">
        {/* Text */}
        <div className="text-start max-w-xl lg:max-w-[52%]">
          <Reveal y={10}>
            <p
              style={{ color: ACCENT, ...arabicStyle }}
              className="text-sm sm:text-base font-semibold tracking-[0.15em] mb-4 sm:mb-4"
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
              className="mt-5 sm:mt-7 max-w-[320px] sm:max-w-md text-sm sm:text-xl leading-snug sm:leading-relaxed text-neutral-400"
            >
              {t("hero.description")}
            </p>
          </Reveal>

          <Reveal delay={350} y={12} className="mt-5 sm:mt-9">
            <div
              dir={isRTL ? "rtl" : "ltr"}
              className="grid grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-8 sm:gap-y-10 max-w-md sm:max-w-lg"
            >
              {focusAreas.map((key, i) => (
                <div key={key} className="text-start">
                  <p className="text-sm font-bold tracking-wide" style={{ color: ACCENT }}>
                    #{String(i + 1).padStart(2, "0")}
                  </p>
                  <p
                    style={{ ...arabicStyle, whiteSpace: !isRTL && i < 3 ? "pre-line" : undefined }}
                    className="mt-1 text-base sm:text-base font-semibold text-white leading-snug"
                  >
                    {!isRTL && i < 3 ? t(key).replace(" ", "\n") : t(key)}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
