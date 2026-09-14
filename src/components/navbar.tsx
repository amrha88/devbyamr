import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { ARABIC_FONT, useLanguage, type TranslationKey } from "@/lib/i18n"

const LOGO = "/assets/logo-white.png"
const ACCENT = "#C3E41D"

const navLinks: { key: TranslationKey; href: string; id: string }[] = [
  { key: "nav.projects", href: "#projects", id: "projects" },
  { key: "nav.about", href: "#about", id: "about" },
  { key: "nav.contact", href: "#contact", id: "contact" },
]

const sectionIds = navLinks.map((link) => link.id)

export function Navbar() {
  const { t, isRTL } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const activeId = useScrollSpy(sectionIds)
  const arabicStyle = isRTL ? { fontFamily: ARABIC_FONT } : undefined

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-lg">
      <nav
        dir={isRTL ? "rtl" : "ltr"}
        className="flex items-center justify-between px-5 sm:px-8 lg:px-12 py-4"
      >
        <a href="#home" className="shrink-0 select-none flex items-center gap-2.5" aria-label="DevByAmr home">
          <img src="/icon.svg" alt="" className="h-7 w-7 sm:h-8 sm:w-8 shrink-0" />
          <img src={LOGO} alt="DevByAmr" className="h-7 sm:h-8 w-auto object-contain" />
        </a>

        <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
          {navLinks.map((link) => {
            const isActive = activeId === link.id
            return (
              <a
                key={link.key}
                href={link.href}
                style={arabicStyle}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-white" : "text-neutral-300 hover:text-white"
                }`}
              >
                {t(link.key)}
                {isActive && (
                  <motion.div
                    layoutId="navbar-lamp"
                    className="absolute inset-0 rounded-full bg-white/10 -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full"
                      style={{ backgroundColor: ACCENT }}
                    >
                      <div
                        className="absolute w-12 h-6 rounded-full blur-md -top-2 -left-2"
                        style={{ backgroundColor: ACCENT, opacity: 0.3 }}
                      />
                      <div
                        className="absolute w-8 h-6 rounded-full blur-md -top-1"
                        style={{ backgroundColor: ACCENT, opacity: 0.3 }}
                      />
                      <div
                        className="absolute w-4 h-4 rounded-full blur-sm top-0 left-2"
                        style={{ backgroundColor: ACCENT, opacity: 0.3 }}
                      />
                    </div>
                  </motion.div>
                )}
              </a>
            )
          })}
        </div>

        <div className="hidden md:flex items-center">
          <LanguageToggle />
        </div>

        <button
          type="button"
          className="md:hidden flex items-center justify-center w-9 h-9 text-neutral-300 hover:text-white transition-colors duration-300"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" strokeWidth={2} /> : <Menu className="w-6 h-6" strokeWidth={2} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className="md:hidden border-t border-white/10 bg-black px-5 py-2"
        >
          <div className="divide-y divide-white/10">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                style={arabicStyle}
                className="block py-4 text-base font-medium text-neutral-200 hover:text-white transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(link.key)}
              </a>
            ))}
          </div>
          <div className="py-4 border-t border-white/10 flex justify-start">
            <LanguageToggle />
          </div>
        </div>
      )}
    </header>
  )
}
