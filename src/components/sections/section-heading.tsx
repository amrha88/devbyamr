import { BlurText } from "@/components/ui/blur-text"
import { ARABIC_FONT, useLanguage } from "@/lib/i18n"

const ACCENT = "#C3E41D"

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  const { isRTL } = useLanguage()

  return (
    <div className="mb-10 sm:mb-14" dir={isRTL ? "rtl" : "ltr"}>
      <p
        className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-3"
        style={{ color: ACCENT, fontFamily: isRTL ? ARABIC_FONT : "'Fira Code', monospace" }}
      >
        {eyebrow}
      </p>
      <BlurText
        text={title}
        delay={40}
        animateBy="words"
        direction="top"
        dir={isRTL ? "rtl" : "ltr"}
        className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
        style={isRTL ? { fontFamily: ARABIC_FONT } : undefined}
      />
    </div>
  )
}
