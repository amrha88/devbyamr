import * as React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface InteractiveHoverButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string
  reverse?: boolean
}

const InteractiveHoverButton = React.forwardRef<HTMLAnchorElement, InteractiveHoverButtonProps>(
  ({ text, reverse = false, className, style, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "group relative inline-flex w-48 sm:w-56 items-center justify-center overflow-hidden rounded-full px-6 py-3.5 text-center font-bold text-black cursor-pointer",
          "shadow-[0_0_20px_6px_rgba(195,228,29,0.4),0_0_45px_16px_rgba(195,228,29,0.24),0_0_90px_30px_rgba(195,228,29,0.12),inset_0_0_18px_rgba(195,228,29,0.2)] transition-shadow duration-300 group-hover:shadow-[0_0_30px_8px_rgba(195,228,29,0.6),0_0_65px_22px_rgba(195,228,29,0.35),0_0_130px_45px_rgba(195,228,29,0.18),inset_0_0_24px_rgba(195,228,29,0.28)]",
          className
        )}
        style={{ backgroundColor: "#C3E41D", ...style }}
        {...props}
      >
        <span
          className={cn(
            "inline-block transition-all duration-300 group-hover:opacity-0",
            reverse
              ? "[transform:translateX(-4px)] group-hover:[transform:translateX(-48px)]"
              : "[transform:translateX(4px)] group-hover:[transform:translateX(48px)]"
          )}
        >
          {text}
        </span>
        <div
          className={cn(
            "absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:opacity-100",
            reverse
              ? "[transform:translateX(-48px)] group-hover:[transform:translateX(4px)]"
              : "[transform:translateX(48px)] group-hover:[transform:translateX(-4px)]"
          )}
        >
          <span>{text}</span>
          <ArrowRight className={cn("w-4 h-4", reverse && "rotate-180")} />
        </div>
        <div className="absolute inset-0 rounded-full bg-black transition-transform duration-300 ease-out [transform:scale(0)] group-hover:[transform:scale(1)]" />
      </a>
    )
  }
)
InteractiveHoverButton.displayName = "InteractiveHoverButton"

export { InteractiveHoverButton }
