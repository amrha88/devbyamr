import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Menu, X } from "lucide-react"
import { InstagramIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { ARABIC_FONT, useLanguage, type TranslationKey } from "@/lib/i18n"

const LOGO = "/assets/logo-white.png"
const ACCENT = "#C3E41D"

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/amr-habib-alla-01bb28355/", icon: LinkedinIcon },
  { label: "Instagram", href: "https://www.instagram.com/amrhabib.297", icon: InstagramIcon },
  { label: "WhatsApp", href: "https://wa.me/972522204251", icon: WhatsappIcon },
]

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
        className="relative flex items-center justify-between px-5 sm:px-8 lg:px-12 py-4"
      >
        <a href="#home" className="shrink-0 select-none flex items-center gap-2.5" aria-label="DevByAmr home">
          <img src="/icon.svg" alt="" className="h-7 w-7 sm:h-7 sm:w-7 shrink-0" />
          <img src={LOGO} alt="DevByAmr" className="h-8 sm:h-8 w-auto object-contain mt-1" />
        </a>

        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 bg-white/5 border border-white/10 rounded-full p-1">
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

        <button
          type="button"
          className="md:hidden relative flex items-center justify-center w-9 h-9 text-neutral-300 hover:text-white transition-colors duration-300"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <motion.span
            animate={{ rotate: isMenuOpen ? 90 : 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            {isMenuOpen ? <X className="w-6 h-6" strokeWidth={2} /> : <Menu className="w-6 h-6" strokeWidth={2} />}
          </motion.span>
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-black/90 backdrop-blur-xl"
          >
            <div dir={isRTL ? "rtl" : "ltr"} className="px-6 py-12 flex flex-col items-center text-center">
              <div className="flex flex-col items-center gap-4">
                {navLinks.map((link, i) => {
                  const isActive = activeId === link.id
                  return (
                    <motion.a
                      key={link.key}
                      href={link.href}
                      style={arabicStyle}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className={`px-3 py-2.5 text-base font-semibold tracking-[0.15em] uppercase transition-colors duration-300 ${
                        isActive ? "text-white" : "text-neutral-400 hover:text-white"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t(link.key)}
                    </motion.a>
                  )
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + navLinks.length * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="mt-9 pt-9 border-t border-white/10 w-full max-w-[220px] flex justify-center"
              >
                <a
                  href="#contact"
                  style={arabicStyle}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/25 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("hero.cta")}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </a>
              </motion.div>

              <motion.p
                style={arabicStyle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + (navLinks.length + 1) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500"
              >
                {t("nav.socials")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + (navLinks.length + 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 flex items-center justify-center gap-4"
              >
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="p-3 rounded-full border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors inline-flex"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </motion.div>

              <motion.p
                style={arabicStyle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + (navLinks.length + 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 max-w-[250px] text-sm leading-relaxed text-neutral-500"
              >
                {t("hero.description")}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
