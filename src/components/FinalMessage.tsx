import { Check, Heart, X } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { useState } from "react"
import { appConfig } from "../config"
import { Reveal } from "./ui/Reveal"

type FinalMessageProps = {
  guestName: string
}

export function FinalMessage({ guestName }: FinalMessageProps) {
  const reduceMotion = useReducedMotion()
  const [pendingAttendance, setPendingAttendance] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submittedAttendance, setSubmittedAttendance] = useState("")
  const [submitError, setSubmitError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (isSubmitting || !pendingAttendance) return

    const payload = {
      guestName: guestName || "Khách mời",
      attendance: pendingAttendance,
      message: message.trim().slice(0, 500),
    }

    setIsSubmitting(true)
    setSubmitError("")

    try {
      window.localStorage.setItem("graduation_rsvp", JSON.stringify(payload))
    } catch {
      // no-op: storage may be unavailable
    }

    try {
      if (appConfig.googleSheetEndpoint) {
        const formBody = new URLSearchParams({
          guestName: String(payload.guestName),
          attendance: payload.attendance,
          message: payload.message,
        })

        const response = await fetch(appConfig.googleSheetEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: formBody.toString(),
          credentials: "omit",
        })

        if (response.status === 401) {
          throw new Error(
            "Google Apps Script Web App is not publicly accessible. Set 'Who has access' to 'Anyone' and deploy again.",
          )
        }

        if (!response.ok) {
          throw new Error(`Google Sheets submission failed with status ${response.status}`)
        }
      }

      console.log("RSVP submitted:", payload)
      setSubmitError("")
      setSubmitted(true)
      setSubmittedAttendance(payload.attendance)
      setPendingAttendance(null)
    } catch (error) {
      console.error("Failed to submit RSVP to Google Sheet:", error)
      setSubmitted(false)
      setSubmitError(
        error instanceof Error ? error.message : "Không thể gửi xác nhận. Vui lòng thử lại.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="story-section final-section" aria-labelledby="final-title">
      <Reveal className="final-card">
        <p className="final-english">LET&apos;S CELEBRATE!</p>
        <p className="final-tagline">Thank you for being part of my journey.</p>

        <div className="rsvp-card">
          <p className="rsvp-question">Bạn sẽ tham dự lễ tốt nghiệp chứ?</p>
          <div className="rsvp-actions">
            <button
              type="button"
              className="rsvp-choice rsvp-choice--yes"
              onClick={() => setPendingAttendance("Tham dự")}
              disabled={isSubmitting || submitted}
            >
              <Check size={20} />
              <span>Tham dự</span>
            </button>
            <button
              type="button"
              className="rsvp-choice rsvp-choice--no"
              onClick={() => setPendingAttendance("Không tham dự")}
              disabled={isSubmitting || submitted}
            >
              <X size={20} />
              <span>Không tham dự</span>
            </button>
          </div>
        </div>

        {pendingAttendance ? (
          <div className="rsvp-dialog-backdrop" role="presentation">
            <div className="rsvp-dialog" role="dialog" aria-modal="true" aria-labelledby="rsvp-dialog-title">
              <p className="rsvp-dialog__eyebrow">Xác nhận phản hồi</p>
              <h3 id="rsvp-dialog-title">Bạn xác nhận &quot;{pendingAttendance}&quot;?</h3>
              <div className="rsvp-field-wrap">
       
                <div className="rsvp-field rsvp-field--textarea">
                  <Heart className="rsvp-icon" size={20} aria-hidden="true" />
                  <textarea
                    id="rsvp-message"
                    value={message}
                    maxLength={500}
                    placeholder="Viết lời chúc của bạn..."
                    onChange={(event) => setMessage(event.target.value)}
                    disabled={isSubmitting}
                    rows={4}
                  />
                </div>
              </div>
              <div className="rsvp-dialog__actions">
                <button type="button" className="rsvp-dialog__cancel" onClick={() => setPendingAttendance(null)} disabled={isSubmitting}>
                  Quay lại
                </button>
                <button type="button" className="rsvp-dialog__confirm" onClick={handleSubmit} disabled={isSubmitting} aria-busy={isSubmitting}>
                  {isSubmitting ? <span className="rsvp-spinner" aria-hidden="true" /> : <Check size={18} />}
                  {isSubmitting ? "Đang gửi..." : "Xác nhận"}
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {submitError ? <p className="rsvp-message rsvp-message--error">{submitError}</p> : null}
        {submitted ? (
          <p className="rsvp-message rsvp-message--success">Đã ghi nhận: {submittedAttendance}. Cảm ơn bạn đã phản hồi!</p>
        ) : (
          <p className="rsvp-message rsvp-message--info"></p>
        )}

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
