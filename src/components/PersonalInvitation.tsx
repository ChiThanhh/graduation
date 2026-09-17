import { useRef, useState } from "react"
import { Typewriter } from "react-simple-typewriter"
import { useInView, useReducedMotion } from "motion/react"
import { graduationConfig } from "../data/graduation"
import { Reveal } from "./ui/Reveal"
import { Sticker } from "./ui/Sticker"

type PersonalInvitationProps = {
  guestName: string
}

export function PersonalInvitation({ guestName }: PersonalInvitationProps) {
  const reduceMotion = useReducedMotion()
  const letterBodyRef = useRef<HTMLDivElement>(null)
  const isLetterInView = useInView(letterBodyRef, { once: true, amount: 0.45 })
  const [isTypingDone, setIsTypingDone] = useState(false)
  const letterText = `
Mỗi chặng đường đều có một điểm dừng để nhìn lại,
và lễ tốt nghiệp là một cột mốc đánh dấu những nỗ lực, trưởng thành và những ký ức đẹp của một hành trình thanh xuân.

Mình trân trọng kính mời gia đình, người thân và bạn bè đến tham dự lễ tốt nghiệp để chia sẽ niềm vui và lưu giữ những khoảnh khác đáng nhớ này. Sự hiện diện của mọi người sẽ là niềm vinh hạnh và là món quà ý nghĩa nhất đối với mình

Rất mong được gặp và đón tiếp mọi người trong ngày đặc biệt này.
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
              <h2 id="invitation-title">
                Dear <span className="name-underline">{guestName}</span>
              </h2>

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
