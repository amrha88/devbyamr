import { useEffect, useState } from "react"

const ACCENT = "#C3E41D"
const LOGO = "/assets/logo-white.png"

// DURATION + HOLD + FADE = 3s total intro
const DURATION = 2300
const HOLD = 200
const FADE = 500

const SIZE = 128
const STROKE = 3
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

type Stage = "loading" | "leaving" | "gone"

export function Preloader() {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState<Stage>("loading")

  useEffect(() => {
    document.body.style.overflow = "hidden"

    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1)
      // easeInOutCubic: gentle start and finish without the long crawl at the end
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      setProgress(eased * 100)

      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        window.setTimeout(() => setStage("leaving"), HOLD)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (stage !== "leaving") return
    document.body.style.overflow = ""
    const id = window.setTimeout(() => setStage("gone"), FADE)
    return () => window.clearTimeout(id)
  }, [stage])

  if (stage === "gone") return null

  const offset = CIRCUMFERENCE * (1 - progress / 100)

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-black transition-opacity ease-out"
      style={{
        opacity: stage === "leaving" ? 0 : 1,
        transitionDuration: `${FADE}ms`,
        pointerEvents: stage === "leaving" ? "none" : "auto",
      }}
    >
      <div className="relative flex items-center justify-center">
        <div
          className="absolute rounded-full blur-2xl"
          style={{
            width: SIZE * 1.3,
            height: SIZE * 1.3,
            backgroundColor: ACCENT,
            opacity: 0.18,
          }}
        />

        <svg width={SIZE} height={SIZE} className="-rotate-90">
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={STROKE}
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={ACCENT}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{
              filter: `drop-shadow(0 0 6px ${ACCENT}99)`,
            }}
          />
        </svg>

        <img
          src="/icon.svg"
          alt=""
          className="absolute w-16 h-16 sm:w-[4.75rem] sm:h-[4.75rem]"
        />
      </div>

      <img src={LOGO} alt="DevByAmr" className="h-7 sm:h-8 w-auto object-contain" />

      <p className="text-xs sm:text-sm font-semibold tabular-nums tracking-[0.3em] text-neutral-600">
        {String(Math.round(progress)).padStart(3, "0")}%
      </p>
    </div>
  )
}
