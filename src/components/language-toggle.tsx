import { useLanguage } from "@/lib/i18n"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const isAr = language === "ar"

  return (
    <div
      className="relative inline-flex items-center rounded-full p-1 bg-neutral-900 border border-white/10"
      role="group"
      aria-label="Language"
    >
      <span
        className={`absolute inset-y-1 left-1 w-10 sm:w-11 rounded-full bg-white transition-transform duration-300 ease-out ${
          isAr ? "translate-x-[40px] sm:translate-x-[44px]" : "translate-x-0"
        }`}
      />
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={!isAr}
        className={`relative z-10 w-10 sm:w-11 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-300 ${
          isAr ? "text-neutral-400" : "text-black"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("ar")}
        aria-pressed={isAr}
        className={`relative z-10 w-10 sm:w-11 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-300 ${
          isAr ? "text-black" : "text-neutral-400"
        }`}
      >
        AR
      </button>
    </div>
  )
}
