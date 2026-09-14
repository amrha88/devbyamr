import { createContext, useContext, useEffect, useState } from "react"

export type Language = "en" | "ar"

const translations = {
  en: {
    "nav.home": "HOME",
    "nav.about": "ABOUT",
    "nav.projects": "PROJECTS",
    "nav.experience": "EXPERIENCE",
    "nav.contact": "CONTACT",
    "hero.role": "Full-Stack Developer",
    "hero.description":
      "Full-stack developer dedicated to building high-quality digital products that balance aesthetic precision with technical excellence",
    "hero.cta": "Get in touch",
    "about.eyebrow": "Who I am",
    "about.title": "About Me",
    "about.p1":
      "I'm Amr, a software developer who enjoys turning ideas into clean, functional products. I care about writing code that's easy to read, easy to maintain, and actually solves the problem in front of me.",
    "about.p2":
      "This is placeholder copy — replace it with your own story: how you got into development, what you're focused on now, and what kind of work excites you.",
    "about.tools": "Tools & Technologies",
    "projects.eyebrow": "Selected work",
    "projects.title": "Projects",
    "experience.eyebrow": "Where I've worked",
    "experience.title": "Experience",
    "contact.eyebrow": "Get in touch",
    "contact.title": "Let's build something",
    "contact.blurb":
      "Have a project in mind or just want to say hi? My inbox is always open.",
    "contact.cta": "Say Hello",
    "footer.rights": "All rights reserved.",
    "footer.navigate": "Navigate",
    "footer.connect": "Connect",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.about": "نبذة",
    "nav.projects": "المشاريع",
    "nav.experience": "الخبرات",
    "nav.contact": "تواصل",
    "hero.role": "مطور برمجيات متكامل",
    "hero.description":
      "أبني مواقع ومنتجات رقمية عالية الجودة — أجمع بين التصميم النظيف والهندسة المتقنة.",
    "hero.cta": "تواصل معي",
    "about.eyebrow": "من أنا",
    "about.title": "نبذة عني",
    "about.p1":
      "أنا عمرو، مطور برمجيات أستمتع بتحويل الأفكار إلى منتجات نظيفة وعملية. أهتم بكتابة كود سهل القراءة، سهل الصيانة، ويحل المشكلة المطروحة فعليًا.",
    "about.p2":
      "هذا نص مبدئي — استبدله بقصتك الخاصة: كيف بدأت في البرمجة، وما الذي تركز عليه الآن، ونوع العمل الذي يثير حماسك.",
    "about.tools": "الأدوات والتقنيات",
    "projects.eyebrow": "أعمال مختارة",
    "projects.title": "المشاريع",
    "experience.eyebrow": "أماكن عملت بها",
    "experience.title": "الخبرات",
    "contact.eyebrow": "تواصل معي",
    "contact.title": "لنبنِ شيئًا معًا",
    "contact.blurb": "لديك مشروع في بالك أو تريد فقط أن تقول مرحبًا؟ بريدي مفتوح دائمًا.",
    "contact.cta": "قل مرحبًا",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.navigate": "روابط",
    "footer.connect": "تواصل",
  },
} as const

export type TranslationKey = keyof (typeof translations)["en"]

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  t: (key: TranslationKey) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en"
  const stored = window.localStorage.getItem("language")
  if (stored === "en" || stored === "ar") return stored
  return "en"
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem("language", language)
  }, [language])

  const toggleLanguage = () => setLanguage((l) => (l === "en" ? "ar" : "en"))
  const t = (key: TranslationKey) => translations[language][key]

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage, t, isRTL: language === "ar" }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}

export const ARABIC_FONT = "'Cairo', sans-serif"
