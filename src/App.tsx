import { ReactLenis } from "lenis/react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { EventDetails } from "./components/EventDetails"
import { FinalMessage } from "./components/FinalMessage"
import { Footer } from "./components/Footer"
import { GraduationReveal } from "./components/GraduationReveal"
import { Hero } from "./components/Hero"
import { Location } from "./components/Location"
import { MusicToggle } from "./components/MusicToggle"
import { PersonalInvitation } from "./components/PersonalInvitation"
import { useGuestName } from "./hooks/useGuestName"

function GraduationInvitation({
  guestName,
  onResetName,
}: {
  guestName: string
  onResetName: () => void
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="invitation-page"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="page-decor" aria-hidden="true">
        <span className="doodle doodle--one">♡</span>
        <span className="doodle doodle--two">✦</span>
        <span className="doodle doodle--three">☆</span>
        <span className="doodle doodle--four">♡</span>
      </div>
      <main>
        <Hero guestName={guestName} />
        <GraduationReveal />
        <PersonalInvitation guestName={guestName} />
        <EventDetails />
        <Location />
        <FinalMessage guestName={guestName} />
      </main>
      <MusicToggle />
      <Footer onResetName={onResetName} />
    </motion.div>
  )
}

function App() {
  const guestNameFromQuery = (() => {
    if (typeof window === "undefined") return ""
    const params = new URLSearchParams(window.location.search)
    return params.get("name") ?? ""
  })()

  const { guestName, clearGuestName } = useGuestName(guestNameFromQuery)

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.08,
        smoothWheel: true,
        touchMultiplier: 1.08,
      }}
    >
      <AnimatePresence mode="wait">
        <GraduationInvitation
          key="invitation"
          guestName={guestName || "bạn"}
          onResetName={clearGuestName}
        />
      </AnimatePresence>
    </ReactLenis>
  )
}

export default App
