import { Mail } from "lucide-react"
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/icons"
import { Reveal } from "@/components/ui/reveal"
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button"
import { SectionHeading } from "@/components/sections/section-heading"
import { ARABIC_FONT, useLanguage } from "@/lib/i18n"

const links = [
  { label: "Email", href: "mailto:amrhabiballa8@gmail.com", icon: Mail },
  { label: "GitHub", href: "https://github.com/amrha88", icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/amr-habib-alla-01bb28355/", icon: LinkedinIcon },
  { label: "Instagram", href: "https://www.instagram.com/amrhabib.297", icon: InstagramIcon },
]

export function Contact() {
  const { t, isRTL } = useLanguage()

  return (
    <section id="contact" className="py-16 sm:py-20 px-6">
      <div className="max-w-screen-md mx-auto text-center">
        <SectionHeading eyebrow={t("contact.eyebrow")} title={t("contact.title")} />

        <Reveal
          as="span"
          dir={isRTL ? "rtl" : "ltr"}
          className="block max-w-xl mx-auto text-base sm:text-lg leading-relaxed text-neutral-400 mb-10"
          style={isRTL ? { fontFamily: ARABIC_FONT } : undefined}
        >
          {t("contact.blurb")}
        </Reveal>

        <Reveal delay={100} as="span" className="inline-block">
          <LiquidGlassButton
            text={t("contact.cta")}
            href="mailto:amrhabiballa8@gmail.com"
            reverse={isRTL}
            dir={isRTL ? "rtl" : "ltr"}
            style={{ fontFamily: isRTL ? ARABIC_FONT : undefined }}
          />
        </Reveal>

        <div className="mt-14 flex items-center justify-center gap-6">
          {links.map(({ label, href, icon: Icon }, i) => (
            <Reveal key={label} delay={200 + i * 80} y={12} blur={false} as="span">
              <a
                href={href}
                aria-label={label}
                className="p-3 rounded-full border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors inline-flex"
              >
                <Icon className="w-5 h-5" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
