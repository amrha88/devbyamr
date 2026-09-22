import { Mail } from "lucide-react"
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/icons"
import { Reveal } from "@/components/ui/reveal"
import { ARABIC_FONT, useLanguage, type TranslationKey } from "@/lib/i18n"

const LOGO = "/assets/logo-white.png"

const navLinks: { key: TranslationKey; href: string }[] = [
  { key: "nav.home", href: "#home" },
  { key: "nav.about", href: "#about" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.experience", href: "#experience" },
  { key: "nav.contact", href: "#contact" },
]

const socialLinks = [
  { label: "Email", href: "mailto:amrhabiballa8@gmail.com", icon: Mail },
  { label: "GitHub", href: "https://github.com/amrha88", icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/amr-habib-alla-01bb28355/", icon: LinkedinIcon },
  { label: "Instagram", href: "https://www.instagram.com/amrhabib.297", icon: InstagramIcon },
]

export function Footer() {
  const { t, isRTL } = useLanguage()

  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t border-neutral-800 px-6 py-12 lg:py-16"
      style={isRTL ? { fontFamily: ARABIC_FONT } : undefined}
    >
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur" />

      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        <Reveal className="space-y-4">
          <img src={LOGO} alt="DevByAmr" className="h-7 w-auto object-contain" />
        </Reveal>

        <div className="grid grid-cols-2 gap-8 md:col-span-2">
          <Reveal delay={100}>
            <h3 className="text-xs font-semibold tracking-wide uppercase text-neutral-500">
              {t("footer.navigate")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-neutral-500 hover:text-white transition-colors duration-300"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <h3 className="text-xs font-semibold tracking-wide uppercase text-neutral-500">
              {t("footer.connect")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-white transition-colors duration-300"
                  >
                    <link.icon className="size-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="mt-10 pt-6 w-full border-t border-neutral-900 flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-xs text-neutral-600">
          © {new Date().getFullYear()} Amr HA. {t("footer.rights")}
        </p>
        <div className="flex items-center gap-5 text-xs text-neutral-500">
          <a href="/privacy.html" className="hover:text-white transition-colors duration-300">
            {t("footer.privacy")}
          </a>
          <a href="/terms.html" className="hover:text-white transition-colors duration-300">
            {t("footer.terms")}
          </a>
        </div>
      </div>
    </footer>
  )
}
