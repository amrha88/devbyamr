import { useLayoutEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"

const ACCENT = "#C3E41D"

interface ProjectItem {
  videoSrc: string
  title: string
  description: string
  bgText?: string
  startTime?: number
  url?: string
}

interface ProjectShowcaseProps {
  items: ProjectItem[]
  className?: string
}

function ProjectCard({ item, delay }: { item: ProjectItem; delay: number }) {
  const bgTextWrapRef = useRef<HTMLDivElement>(null)
  const bgTextSpanRef = useRef<HTMLSpanElement>(null)
  const [driftPx, setDriftPx] = useState(0)

  useLayoutEffect(() => {
    function measure() {
      const wrap = bgTextWrapRef.current
      const span = bgTextSpanRef.current
      if (!wrap || !span) {
        setDriftPx(0)
        return
      }
      const overflow = Math.max(0, span.scrollWidth - wrap.clientWidth)
      setDriftPx(overflow / 2)
    }

    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [item.bgText])

  const driftDuration = Math.min(16, Math.max(7, driftPx / 20))

  return (
    <Reveal delay={delay} y={30} className="px-4">
      <div className="relative mx-auto w-full max-w-4xl">
        {item.bgText && (
          <div
            ref={bgTextWrapRef}
            className="absolute inset-x-0 -top-8 sm:-top-14 flex items-start justify-center pointer-events-none select-none overflow-hidden"
          >
            <span
              ref={bgTextSpanRef}
              className="text-[14vw] sm:text-[9vw] font-extrabold tracking-tight text-white/10 whitespace-nowrap leading-none"
              style={
                {
                  "--drift": `${driftPx}px`,
                  animation: driftPx > 0 ? `wordmark-drift ${driftDuration}s ease-in-out infinite` : "none",
                } as React.CSSProperties
              }
            >
              {item.bgText}
            </span>
          </div>
        )}

        <div className="relative flex flex-col items-center gap-6 sm:gap-8">
          <div className="relative w-full aspect-video">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover rounded-2xl border border-neutral-800 shadow-2xl"
              onLoadedMetadata={(e) => {
                e.currentTarget.currentTime = item.startTime ?? 0
              }}
            >
              <source src={item.videoSrc} type="video/mp4" />
            </video>
          </div>

          <div className="relative text-center max-w-lg">
            <h3 className="text-lg sm:text-xl font-bold text-white">{item.title}</h3>
            <p className="mt-1.5 text-sm sm:text-base text-neutral-400">{item.description}</p>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/25 transition-colors duration-300"
              >
                Show me more
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export function ProjectShowcase({ items, className = "" }: ProjectShowcaseProps) {
  return (
    <div className={`flex flex-col pt-16 sm:pt-20 ${className}`}>
      {items.map((item, i) => (
        <div key={item.videoSrc}>
          {i > 0 && (
            <div className="relative h-px w-full max-w-4xl mx-auto my-20 sm:my-28 bg-gradient-to-r from-transparent via-white/15 to-transparent">
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-20 sm:w-28 rounded-full"
                style={{ backgroundColor: ACCENT, boxShadow: `0 0 6px 1px ${ACCENT}` }}
              />
            </div>
          )}
          <ProjectCard item={item} delay={i === 0 ? 0 : 60} />
        </div>
      ))}
    </div>
  )
}
