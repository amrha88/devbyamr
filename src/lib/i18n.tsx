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
      "I'm Amr, an Information Systems student with a strong foundation in Java, Python, SQL, and object-oriented programming, and a growing focus on full-stack web development — this site included. I care about writing code that's clean, well-structured, and solves a real problem, not just code that runs.",
    "about.p2":
      "Before development, I picked up real responsibility early: managing shift operations as a bar supervisor, coaching swimming and basketball, and representing my community at an international leadership camp in Finland. That background shapes how I work today — dependable, detail-oriented, and comfortable owning a problem end to end. I'm fluent in Arabic, Hebrew, and English.",
    "about.tools": "Tools & Technologies",
    "projects.eyebrow": "Selected work",
    "projects.title": "Recent Projects",
    "projects.featured.title": "chefalaa.co.il",
    "projects.featured.description":
      "A private chef website | from layout to motion, designed and built to show how the final product could look and feel.",
    "projects.featured2.title": "Locanda",
    "projects.featured2.description":
      "A restaurant website mockup | from layout to motion, designed and built to show how the final product could look and feel.",
    "projects.featured3.title": "Finance Consulting office",
    "projects.featured3.description":
      "A financial consulting website mockup | from layout to motion, designed and built to show how the final product could look and feel.",
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
      "أنا عمرو، طالب نظم معلومات أبني أساسًا قويًا في جافا وبايثون و SQL والبرمجة كائنية التوجه، مع تركيز متنامٍ على تطوير الويب المتكامل — وهذا الموقع أحد نتائج ذلك. أهتم بكتابة كود نظيف ومنظم يحل مشكلة حقيقية، لا مجرد كود يعمل.",
    "about.p2":
      "قبل البرمجة، تحمّلت مسؤوليات حقيقية مبكرًا: إدارة عمليات المناوبات كمسؤول بار، وتدريب السباحة وكرة السلة، وتمثيل مجتمعي في معسكر قيادة دولي في فنلندا. هذه الخلفية تنعكس في أسلوب عملي اليوم: دقيق وموثوق وقادر على تولي المشكلة من بدايتها لنهايتها. أتحدث العربية والعبرية والإنجليزية بطلاقة.",
    "about.tools": "الأدوات والتقنيات",
    "projects.eyebrow": "أعمال مختارة",
    "projects.title": "المشاريع",
    "projects.featured.title": "شيف علاء",
    "projects.featured.description":
      "تصميم مبدئي لموقع مطعم — من التخطيط إلى الحركة، صُمم ليُظهر كيف سيبدو ويشعر المنتج النهائي.",
    "projects.featured2.title": "لوكاندا",
    "projects.featured2.description":
      "تصميم مبدئي لموقع مطعم — من التخطيط إلى الحركة، صُمم ليُظهر كيف سيبدو ويشعر المنتج النهائي.",
    "projects.featured3.title": "تساحي تافور",
    "projects.featured3.description":
      "تصميم مبدئي لموقع استشارات مالية — من التخطيط إلى الحركة، صُمم ليُظهر كيف سيبدو ويشعر المنتج النهائي.",
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
