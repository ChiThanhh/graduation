import { useRef, useState } from "react"
import { Typewriter } from "react-simple-typewriter"
import { useInView, useReducedMotion } from "motion/react"
import { graduationConfig } from "../data/graduation"
import { Reveal } from "./ui/Reveal"
import { Sticker } from "./ui/Sticker"

export function PersonalInvitation() {
  const reduceMotion = useReducedMotion()
  const letterBodyRef = useRef<HTMLDivElement>(null)
  const isLetterInView = useInView(letterBodyRef, { once: true, amount: 0.45 })
  const [isTypingDone, setIsTypingDone] = useState(false)
  const letterText = `
Ngày tốt nghiệp sẽ ý nghĩa hơn rất nhiều khi có những người mình yêu quý cùng hiện diện.

Thân mời gia đình, anh chị và bạn bè đến chung vui cùng mình trong khoảnh khắc đặc biệt này. Cảm ơn mọi người vì đã luôn là một phần thật đẹp trong hành trình của mình.

Hẹn gặp nhau tại lễ tốt nghiệp nhé!
With love,
${graduationConfig.graduateName} ♡`
  const shouldShowFullLetter = reduceMotion || isTypingDone

  return (
    <section className="story-section invitation-section" aria-labelledby="invitation-title">
      <div className="section-inner invitation-wrap">
        <Reveal>
          <article className="letter-card">
            <Sticker className="letter-heart">♡</Sticker>
            <div className="letter-content">
              <p className="letter-date">a little note</p>
              <div
                className="letter-body letter-body--typewriter"
                ref={letterBodyRef}
                aria-live="polite"
              >
                <span className="typewriter-ghost" aria-hidden="true">
                  {letterText}
                </span>
                <span className="typewriter-live">
                  {shouldShowFullLetter ? (
                    letterText
                  ) : isLetterInView ? (
                    <Typewriter
                      words={[letterText]}
                      loop={1}
                      typeSpeed={18}
                      deleteSpeed={999999}
                      delaySpeed={800}
                      cursor
                      cursorBlinking
                      cursorStyle="|"
                      onLoopDone={() => setIsTypingDone(true)}
                    />
                  ) : null}
                </span>
              </div>

            </div>

          </article>
        </Reveal>
      </div>
    </section>
  )
}
