import { GraduationCap } from "lucide-react"
import { Polaroid } from "./ui/Polaroid"
import { Reveal } from "./ui/Reveal"
import { SectionHeading } from "./ui/SectionHeading"
import { Sticker } from "./ui/Sticker"

export function GraduationReveal() {
  return (
    <section className="story-section graduation-reveal" aria-labelledby="graduation-title">
      <div className="section-inner graduation-grid">
        <Reveal className="graduation-copy">
          <SectionHeading eyebrow="chapter one" title="Mình sắp tốt nghiệp rồi!" align="left">
            <p>
              Sau rất nhiều deadline,
              <br />
              những buổi sáng vội vàng,
              <br />
              và cả những đêm thức khuya...
            </p>
            <p>cuối cùng ngày này cũng tới.</p>
          </SectionHeading>
          <p className="highlight-line">
            <GraduationCap size={24} />
            I&apos;m graduating! ✨
          </p>
        </Reveal>

        <Reveal className="graduation-photo" delay={0.12}>
          <Sticker className="tape tape--top"> </Sticker>
          <Polaroid
            src="/image/1.jpg?v=graduation-1"
            alt="Graduation memory"
            caption="finally made it ♡"
            priority
          />
        </Reveal>
      </div>
    </section>
  )
}
