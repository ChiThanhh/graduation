import { Heart } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { Reveal } from "./ui/Reveal"

type FinalMessageProps = {
  guestName: string
}

export function FinalMessage({ guestName }: FinalMessageProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="story-section final-section" aria-labelledby="final-title">
      <Reveal className="final-card">
        <h2 id="final-title">Vậy nha, {guestName} ♡</h2>
        <p>
          Hy vọng ngày hôm đó
          <br />
          mình sẽ nhìn thấy bạn ở đó.
        </p>
        <p className="final-english">See you on my graduation day!</p>
        <span>Thanks for being part of my journey.</span>
        <motion.div
          className="soft-heart"
          aria-hidden="true"
          animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Heart size={32} fill="currentColor" />
        </motion.div>
      </Reveal>
    </section>
  )
}
