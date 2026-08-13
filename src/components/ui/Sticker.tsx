import type { PropsWithChildren } from "react"
import { motion, useReducedMotion } from "motion/react"

type StickerProps = PropsWithChildren<{
  className?: string
  delay?: number
}>

export function Sticker({ children, className, delay = 0 }: StickerProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.span
      aria-hidden="true"
      className={`sticker ${className ?? ""}`}
      animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
      transition={{
        duration: 4,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.span>
  )
}
