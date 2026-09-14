import { useEffect, useRef, useState } from "react"

interface VideoScrollHeroProps {
  videoSrc: string
  title: string
  description: string
  bgText?: string
  className?: string
}

export function VideoScrollHero({
  videoSrc,
  title,
  description,
  bgText,
  className = "",
}: VideoScrollHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    const node = ref.current
    if (node) observer.observe(node)

    return () => {
      if (node) observer.unobserve(node)
    }
  }, [])

  return (
    <div ref={ref} className={`relative py-10 sm:py-14 ${className}`}>
      {bgText && (
        <div className="absolute inset-x-0 -top-4 sm:-top-8 flex items-start justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[14vw] sm:text-[9vw] font-extrabold tracking-tight text-white/10 whitespace-nowrap leading-none">
            {bgText}
          </span>
        </div>
      )}

      <div className="relative flex flex-col items-center gap-6 sm:gap-8 px-4">
        <div
          className="relative w-[90vw] max-w-4xl aspect-video transition-all duration-700 ease-out"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "scale(1)" : "scale(0.85)",
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover rounded-2xl border border-neutral-800 shadow-2xl"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>

        <div
          className="relative text-center max-w-lg transition-opacity duration-700 ease-out"
          style={{ opacity: inView ? 1 : 0, transitionDelay: inView ? "250ms" : "0ms" }}
        >
          <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
          <p className="mt-1.5 text-sm sm:text-base text-neutral-400">{description}</p>
        </div>
      </div>
    </div>
  )
}
