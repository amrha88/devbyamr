import { useEffect, useRef, useState } from "react"

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  blur?: boolean
  as?: "div" | "span"
  dir?: "ltr" | "rtl"
  style?: React.CSSProperties
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  blur = true,
  as = "div",
  dir,
  style: extraStyle,
}: RevealProps) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    )

    const node = ref.current
    if (node) observer.observe(node)

    return () => {
      if (node) observer.unobserve(node)
    }
  }, [])

  const Tag = as
  return (
    <Tag
      ref={ref as never}
      dir={dir}
      className={className}
      style={{
        ...extraStyle,
        opacity: inView ? 1 : 0,
        filter: inView ? "blur(0px)" : blur ? "blur(8px)" : "none",
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, filter 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  )
}
