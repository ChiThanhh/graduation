import { useRef, useState } from "react"
import { Typewriter } from "react-simple-typewriter"
import { motion, useInView, useReducedMotion } from "motion/react"
import { graduationConfig } from "../data/graduation"
import { Polaroid } from "./ui/Polaroid"
import { Reveal } from "./ui/Reveal"
import { Sticker } from "./ui/Sticker"

type PersonalInvitationProps = {
  guestName: string
}

const letterPhotos = [
  {
    className: "letter-photo--one",
    src: "/image/4.png",
    alt: "Graduation photo 1",
    caption: "sweet memory",
    rotate: "-5deg",
    delay: 0,
  },
  {
    className: "letter-photo--two",
    src: "/image/5.png",
    alt: "Graduation photo 2",
    caption: "little joy",
    rotate: "4deg",
    delay: 0.12,
  },
  {
    className: "letter-photo--three",
    src: "/image/6.png",
    alt: "Graduation photo 3",
    caption: "see you there",
    rotate: "-3deg",
    delay: 0.24,
  },
]

export function PersonalInvitation({ guestName }: PersonalInvitationProps) {
  const reduceMotion = useReducedMotion()
  const letterBodyRef = useRef<HTMLDivElement>(null)
  const isLetterInView = useInView(letterBodyRef, { once: true, amount: 0.45 })
  const [isTypingDone, setIsTypingDone] = useState(false)
  const letterText = `Sau một hành trình thật dài,
cuối cùng em cũng đã đến ngày tốt nghiệp.

Và trong ngày đặc biệt này,
em thật sự rất muốn ${guestName} có mặt.

Không cần món quà gì đâu.

Chỉ cần anh/chị đến,
chụp với em vài tấm hình,
và cùng em giữ lại một chút kỷ niệm
là đủ rồi ♡

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

            <div className="letter-photo-stack" aria-label="Graduation photos">
              {letterPhotos.map((photo, index) => (
                <motion.div
                  className={`letter-photo ${photo.className}`}
                  key={photo.src}
                  initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.9, rotate: -2 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1, rotate: 0 }}
                  animate={reduceMotion ? undefined : { y: [0, index % 2 === 0 ? -4 : 4, 0] }}
                  whileHover={reduceMotion ? undefined : { scale: 1.045, zIndex: 8 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    opacity: { duration: 0.5, delay: photo.delay },
                    y: {
                      duration: 4.6 + index * 0.4,
                      delay: 0.5 + photo.delay,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    },
                    scale: { duration: 0.5, delay: photo.delay },
                    rotate: { duration: 0.5, delay: photo.delay },
                  }}
                >
                  <Sticker className={`letter-photo-tape letter-photo-tape--${index + 1}`}> </Sticker>
                  <Polaroid
                    src={photo.src}
                    alt={photo.alt}
                    caption={photo.caption}
                    rotate={photo.rotate}
                  />
                </motion.div>
              ))}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
