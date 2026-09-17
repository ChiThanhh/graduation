import { Polaroid } from "./ui/Polaroid"
import { Reveal } from "./ui/Reveal"
import { Sticker } from "./ui/Sticker"

export function GraduationReveal() {
  return (
    <section className="story-section graduation-reveal" aria-labelledby="graduation-title">
      <div className="section-inner graduation-grid">

        <Reveal className="graduation-photo" delay={0.12}>
          <Sticker className="tape tape--top"> </Sticker>
          <Polaroid
            src="/image/1.jpg?v=graduation-1"
            alt="Graduation memory"
            caption="I'm graduating! ♡"
            priority
          />
        </Reveal>
      </div>
    </section>
  )
}
