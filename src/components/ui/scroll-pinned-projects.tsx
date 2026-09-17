import { useEffect, useLayoutEffect, useRef, useState } from "react"

interface ProjectItem {
  videoSrc: string
  title: string
  description: string
  bgText?: string
  startTime?: number
}

interface ScrollPinnedProjectsProps {
  items: ProjectItem[]
  className?: string
}

const HOLD_FRACTION = 0.4
const LEAD_HOLD_VH = 10
const TRAIL_HOLD_VH = 25

export function ScrollPinnedProjects({ items, className = "" }: ScrollPinnedProjectsProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const bgTextWrapRef = useRef<HTMLDivElement>(null)
  const bgTextSpanRef = useRef<HTMLSpanElement>(null)
  const [phase, setPhase] = useState<"before" | "pinned" | "after">("before")
  const [displayIndex, setDisplayIndex] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [driftPx, setDriftPx] = useState(0)

  useEffect(() => {
    let raf = 0

    function update() {
      raf = requestAnimationFrame(update)
      const track = trackRef.current
      if (!track) return

      const rect = track.getBoundingClientRect()
      const vh = window.innerHeight

      if (rect.top > 0) {
        setPhase("before")
        setDisplayIndex(0)
        setRotation(0)
        return
      }

      if (rect.bottom <= vh) {
        setPhase("after")
        setDisplayIndex(items.length - 1)
        setRotation(0)
        return
      }

      setPhase("pinned")

      const leadPx = (LEAD_HOLD_VH / 100) * vh
      const scrolled = Math.max(0, -rect.top - leadPx)
      const progress = Math.min(items.length - 1, scrolled / vh)
      const k = Math.min(items.length - 2, Math.floor(progress))
      const s = progress - k

      if (s < HOLD_FRACTION || k >= items.length - 1) {
        setDisplayIndex(k)
        setRotation(0)
        return
      }

      const t = (s - HOLD_FRACTION) / (1 - HOLD_FRACTION)
      if (t < 0.5) {
        setDisplayIndex(k)
        setRotation(-90 * (t * 2))
      } else {
        setDisplayIndex(k + 1)
        setRotation(90 * (1 - (t - 0.5) * 2))
      }
    }

    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [items.length])

  const current = items[displayIndex]

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
  }, [current.bgText])

  const driftDuration = Math.min(16, Math.max(7, driftPx / 20))

  const trackHeight = `${items.length * 100 + LEAD_HOLD_VH + TRAIL_HOLD_VH}dvh`

  const shellClass =
    phase === "pinned"
      ? "fixed inset-x-0 top-0 h-dvh w-full z-20 bg-black"
      : phase === "after"
        ? "absolute inset-x-0 top-[calc(100%-100dvh)] h-dvh w-full bg-black"
        : "absolute inset-x-0 top-0 w-full bg-black"

  const innerClass =
    phase === "before"
      ? "relative w-full flex items-center justify-center px-4 py-14 sm:py-16"
      : "relative w-full h-full flex items-center justify-center px-4 pt-20 sm:pt-24"

  return (
    <div ref={trackRef} className={`relative ${className}`} style={{ height: trackHeight }}>
      <div className={shellClass}>
        <div className={innerClass}>
          <div className="relative w-full max-w-4xl">
            {current.bgText && (
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
                  {current.bgText}
                </span>
              </div>
            )}

            <div className="relative flex flex-col items-center gap-6 sm:gap-8">
              <div className="relative w-full aspect-video" style={{ perspective: "1600px" }}>
                <div
                  className="w-full h-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateX(${rotation}deg)`,
                  }}
                >
                  <video
                    key={current.videoSrc}
                    autoPlay
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover rounded-2xl border border-neutral-800 shadow-2xl"
                    style={{ backfaceVisibility: "hidden" }}
                    onLoadedMetadata={(e) => {
                      e.currentTarget.currentTime = current.startTime ?? 0
                    }}
                    onEnded={(e) => {
                      e.currentTarget.currentTime = current.startTime ?? 0
                      e.currentTarget.play()
                    }}
                  >
                    <source src={current.videoSrc} type="video/mp4" />
                  </video>
                </div>
              </div>

              <div className="relative text-center max-w-lg">
                <h3 className="text-lg sm:text-xl font-bold text-white">{current.title}</h3>
                <p className="mt-1.5 text-sm sm:text-base text-neutral-400">{current.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
