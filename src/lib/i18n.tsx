import { createContext, useContext, useEffect, useState } from "react"

export type Language = "en" | "ar"

const translations = {
  en: {
    "nav.home": "HOME",
    "nav.about": "ABOUT",
    "nav.projects": "PROJECTS",
    "nav.experience": "EXPERIENCE",
    "nav.contact": "CONTACT",
    "nav.socials": "My Socials",
    "hero.role": "Full-Stack Developer",
    "hero.description":
      "Full-stack developer dedicated to building high-quality digital products that balance aesthetic precision with technical excellence",
    "hero.cta": "Get in touch",
    "about.eyebrow": "Who I am",
    "about.title": "About Me",
    "about.intro":
      "I'm Amr, an Information Systems student and freelance developer. I build websites and web applications with clean, well-structured code, and the dependability to see a problem through to the end",
    "about.tools": "Tools & Technologies",
    "about.trustedBy": "Brands I've Helped Shape",
    "about.pathEyebrow": "The Path Here",
    "about.path1Title": "Freelance Developer",
    "about.path1Subtitle": "Building clean, real-world web apps for real clients — present day",
    "about.path2Title": "Leadership Camp, Finland",
    "about.path2Subtitle": "Represented my community internationally",
    "about.path3Title": "Bar Supervisor",
    "about.path3Subtitle": "Ran shift operations, learned to own a room",
    "about.path4Title": "Swim & Basketball Coach",
    "about.path4Subtitle": "Coaching kids before any of this",
    "about.path5Title": "Information Systems Student",
    "about.path5Subtitle": "Foundation in Java, Python, SQL, and object-oriented programming",
    "about.quote1Text": "Code is the easy part. Showing up, owning it, and getting it right —",
    "about.quote1Highlight": "that's the job.",
    "about.quote2Text": "A strong foundation in Java, Python, SQL, and object-oriented programming — with a growing focus on",
    "about.quote2Highlight": "full-stack web development.",
    "about.projectEyebrow": "Final College Project",
    "about.projectTitle": "Automate",
    "about.projectSubtitle": "My final project at university, explore the source on GitHub.",
    "about.viewOnGithub": "View on GitHub",
    "about.viewPresentation": "View Presentation",
    "about.statsEyebrow": "By the Numbers",
    "about.statYears": "Years coding",
    "about.statProjects": "Projects shipped",
    "about.statGpa": "College GPA",
    "about.statLanguages": "Languages spoken",
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
    "nav.socials": "حساباتي الاجتماعية",
    "hero.role": "مطور برمجيات متكامل",
    "hero.description":
      "أبني مواقع ومنتجات رقمية عالية الجودة — أجمع بين التصميم النظيف والهندسة المتقنة.",
    "hero.cta": "تواصل معي",
    "about.eyebrow": "من أنا",
    "about.title": "نبذة عني",
    "about.intro":
      "أنا عمرو — طالب نظم معلومات أكتب كودًا نظيفًا ومنظمًا، ودقيق وموثوق بما يكفي لأتولى المشكلة من بدايتها لنهايتها.",
    "about.tools": "الأدوات والتقنيات",
    "about.trustedBy": "علامات تجارية ساهمت في صناعتها",
    "about.pathEyebrow": "مسيرتي حتى الآن",
    "about.path1Title": "مطور مستقل",
    "about.path1Subtitle": "أبني مواقع نظيفة لعملاء حقيقيين — حتى اليوم",
    "about.path2Title": "معسكر قيادة، فنلندا",
    "about.path2Subtitle": "مثّلت مجتمعي على المستوى الدولي",
    "about.path3Title": "مسؤول بار",
    "about.path3Subtitle": "أدرت عمليات المناوبات وتعلمت القيادة",
    "about.path4Title": "مدرب سباحة وكرة سلة",
    "about.path4Subtitle": "درّبت الأطفال قبل كل هذا",
    "about.path5Title": "طالب نظم معلومات",
    "about.path5Subtitle": "أساس قوي في جافا وبايثون و SQL والبرمجة كائنية التوجه",
    "about.quote1Text": "الكود هو الجزء السهل. الحضور، وتحمّل المسؤولية، وإتقان العمل —",
    "about.quote1Highlight": "هذا هو التحدي الحقيقي.",
    "about.quote2Text": "أساس قوي في جافا وبايثون و SQL والبرمجة كائنية التوجه — مع تركيز متنامٍ على",
    "about.quote2Highlight": "تطوير الويب المتكامل.",
    "about.projectEyebrow": "مشروع التخرج الجامعي",
    "about.projectTitle": "Automate",
    "about.projectSubtitle": "مشروع تخرجي الجامعي — اطّلع على الكود على GitHub.",
    "about.viewOnGithub": "عرض على GitHub",
    "about.viewPresentation": "عرض التقديم",
    "about.statsEyebrow": "بالأرقام",
    "about.statYears": "سنوات برمجة",
    "about.statProjects": "مشاريع منجزة",
    "about.statGpa": "المعدل الجامعي",
    "about.statLanguages": "لغات أتحدثها",
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
