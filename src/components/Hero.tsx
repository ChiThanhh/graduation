import { ArrowDown, GraduationCap, Mail } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { Polaroid } from "./ui/Polaroid"
import { Reveal } from "./ui/Reveal"
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

      <div className="hero-layout">
        <motion.div
          className="hero-content"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="hero-headline"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <span className="hero-badge">Thư mời</span>
            <h1 id="hero-title">{guestName} ♡</h1>
          </motion.div>
        </motion.div>

        <Reveal className="hero-photo" delay={0.18}>
          <div className="hero-photo__tape" aria-hidden="true" />
          <Polaroid
            src="/image/1.jpg?v=graduation-1"
            alt="Graduation memory"
            caption="I'm graduating! ♡"
            priority
          />
        </Reveal>

        <motion.div
          className="scroll-cue"
          aria-hidden="true"
          animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
        >
          <ArrowDown size={24} />
        </motion.div>
      </div>
    </section>
  )
}
