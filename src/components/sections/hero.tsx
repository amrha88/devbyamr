import { useState } from "react"
import { ChevronDown, User } from "lucide-react"
import { BlurText } from "@/components/ui/blur-text"
import { Reveal } from "@/components/ui/reveal"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { ARABIC_FONT, useLanguage } from "@/lib/i18n"

const ACCENT = "#C3E41D"
const PROFILE_SRC = "/assets/profile.jpg"

export function Hero() {
  const [imageFailed, setImageFailed] = useState(false)
  const { t, isRTL } = useLanguage()
  const arabicStyle = isRTL ? { fontFamily: ARABIC_FONT } : undefined

  return (
    <section
      id="home"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative min-h-screen flex flex-col items-center justify-between sm:justify-center gap-6 sm:gap-6 px-4 pt-24 sm:pt-28 pb-28 sm:pb-20"
    >
      {/* Role */}
      <Reveal y={10} className="mt-6 sm:mt-0">
        <p
          dir={isRTL ? "rtl" : "ltr"}
          style={{
            fontFamily: isRTL ? ARABIC_FONT : "'Fira Code', monospace",
            textShadow: "0 0 8px rgba(255,255,255,0.55), 0 0 18px rgba(255,255,255,0.3)",
          }}
          className="text-sm sm:text-sm font-semibold tracking-[0.25em] uppercase text-white"
        >
          {t("hero.role")}
        </p>
      </Reveal>

      {/* Centered Name + Photo cutout */}
      <div className="relative text-center">
        <div>
          <BlurText
            text="AMR"
            delay={100}
            animateBy="letters"
            direction="top"
            dir="ltr"
            className="font-bold text-[172px] min-[375px]:text-[200px] sm:text-[160px] md:text-[195px] lg:text-[230px] xl:text-[260px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
            style={{ color: ACCENT, fontFamily: "'Fira Code', monospace" }}
          />
        </div>
        <div>
          <BlurText
            text="HA"
            delay={100}
            animateBy="letters"
            direction="top"
            dir="ltr"
            className="font-bold text-[172px] min-[375px]:text-[200px] sm:text-[160px] md:text-[195px] lg:text-[230px] xl:text-[260px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
            style={{ color: ACCENT, fontFamily: "'Fira Code', monospace" }}
          />
        </div>

        {/* Profile Picture */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-[112px] h-[190px] min-[375px]:w-[130px] min-[375px]:h-[220px] sm:w-[103px] sm:h-[174px] md:w-[120px] md:h-[203px] lg:w-[140px] lg:h-[237px] xl:w-[158px] xl:h-[267px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer bg-neutral-800 flex items-center justify-center">
            {imageFailed ? (
              <User className="w-1/2 h-1/2 text-neutral-500" strokeWidth={1.5} />
            ) : (
              <img
                src={PROFILE_SRC}
                alt="Amr HA"
                className="w-full h-full object-cover"
                onError={() => setImageFailed(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Description + Contact Me button */}
      <div className="flex flex-col items-center gap-6 sm:contents">
        <BlurText
          text={t("hero.description")}
          delay={150}
          animateBy="words"
          direction="top"
          dir={isRTL ? "rtl" : "ltr"}
          className="max-w-sm sm:max-w-md text-[18px] sm:text-[17px] md:text-[18px] leading-relaxed justify-center text-center transition-colors duration-300 text-neutral-400 hover:text-white"
          style={{ fontFamily: isRTL ? ARABIC_FONT : "'Antic', sans-serif" }}
        />

        <Reveal delay={450} y={12}>
          <InteractiveHoverButton
            text={t("hero.cta")}
            href="#contact"
            reverse={isRTL}
            dir={isRTL ? "rtl" : "ltr"}
            style={{ backgroundColor: "#ffffff", ...arabicStyle }}
          />
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
