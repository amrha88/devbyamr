import React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number
  pauseOnHover?: boolean
  direction?: "left" | "right" | "up" | "down"
  fade?: boolean
  fadeAmount?: number
}

export function Marquee({
  children,
  className,
  duration = 20,
  pauseOnHover = false,
  direction = "left",
  fade = true,
  fadeAmount = 10,
  ...props
}: MarqueeProps) {
  const [isPaused, setIsPaused] = React.useState(false)

  const items = React.Children.toArray(children)
  const isVertical = direction === "up" || direction === "down"

  return (
    <>
      <style>
        {`
        @keyframes scroll {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        @keyframes scroll-reverse {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        @keyframes scroll-y {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(0, -50%, 0); }
        }

        @keyframes scroll-y-reverse {
          from { transform: translate3d(0, -50%, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        .marquee-scroller {
          display: flex;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          animation: ${
            isVertical
              ? direction === "up"
                ? "scroll-y"
                : "scroll-y-reverse"
              : direction === "left"
                ? "scroll"
                : "scroll-reverse"
          } ${duration}s linear infinite;
        }

        .marquee-scroller.paused {
          animation-play-state: paused;
        }
      `}
      </style>
      <div
        className={cn("flex w-full overflow-hidden", isVertical && "flex-col", className)}
        style={{
          // Own compositing layer so iOS Safari doesn't drop the animated strip while scrolling
          transform: "translateZ(0)",
          ...(fade && {
            maskImage: isVertical
              ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`
              : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`,
            WebkitMaskImage: isVertical
              ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`
              : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`,
          }),
        }}
        onPointerEnter={(e) => pauseOnHover && e.pointerType === "mouse" && setIsPaused(true)}
        onPointerLeave={(e) => pauseOnHover && e.pointerType === "mouse" && setIsPaused(false)}
        {...props}
      >
        <div
          className={cn("marquee-scroller flex shrink-0", isVertical && "flex-col", isPaused && "paused")}
        >
          {items.map((item, index) => (
            <div key={`first-${index}`} className={cn("flex shrink-0", isVertical && "w-full")}>
              {item}
            </div>
          ))}
          {items.map((item, index) => (
            <div key={`second-${index}`} className={cn("flex shrink-0", isVertical && "w-full")}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
