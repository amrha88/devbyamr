import * as React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface LiquidGlassButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string
  reverse?: boolean
}

const LiquidGlassButton = React.forwardRef<HTMLAnchorElement, LiquidGlassButtonProps>(
  ({ text, reverse = false, className, style, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm sm:text-base font-semibold text-white cursor-pointer",
          "border border-white/15 bg-white/10 backdrop-blur-xl",
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),inset_0_-6px_10px_-6px_rgba(255,255,255,0.08),0_10px_30px_-8px_rgba(0,0,0,0.5)]",
          "transition-all duration-300 ease-out hover:bg-white/[0.16] hover:border-white/30",
          "hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_-6px_12px_-6px_rgba(255,255,255,0.12),0_14px_36px_-8px_rgba(0,0,0,0.55)]",
          "active:scale-[0.97]",
          className
        )}
        style={style}
        {...props}
      >
        <span>{text}</span>
        <ArrowRight
          className={cn(
            "w-4 h-4 transition-transform duration-300",
            reverse ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
          )}
        />
      </a>
    )
  }
)
LiquidGlassButton.displayName = "LiquidGlassButton"

export { LiquidGlassButton }
