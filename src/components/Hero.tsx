import { ArrowDown, GraduationCap, Mail } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { Sticker } from "./ui/Sticker"

type HeroProps = {
  guestName: string
}

export function Hero({ guestName }: HeroProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-decor" aria-hidden="true">
        <Sticker className="hero-sticker hero-sticker--cap">
          <GraduationCap size={28} />
        </Sticker>
        <Sticker className="hero-sticker hero-sticker--mail" delay={0.9}>
          <Mail size={26} />
        </Sticker>
      </div>

      <motion.div
        className="hero-content"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.p
          className="hero-note"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          thư nhỏ xinh này là của bạn
        </motion.p>
        <h1 id="hero-title">Hey, {guestName}! ♡</h1>
        <motion.p
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.42 }}
        >
          Có một chuyện nhỏ
          <br />
          mình muốn kể cho bạn nghe...
        </motion.p>
        <motion.div
          className="scroll-cue"
          aria-hidden="true"
          animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
        >
          <ArrowDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  )
}
