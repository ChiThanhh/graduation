import { Heart, MailCheck } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { useMemo, useState, type FormEvent } from "react"
import { appConfig } from "../config"
import { Reveal } from "./ui/Reveal"

type FinalMessageProps = {
  guestName: string
}

export function FinalMessage({ guestName }: FinalMessageProps) {
  const reduceMotion = useReducedMotion()
  const [form, setForm] = useState({
    name: "",
    guestCount: 1,
    cannotAttend: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const statusText = useMemo(() => {
    if (submitted) return "Cảm ơn bạn đã phản hồi!"
    return "Tôi sẽ chờ bạn ở đó ✨"
  }, [submitted])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    const trimmedName = form.name.trim()
    const payload = {
      guestName: trimmedName || guestName || "Khách mời",
      guestCount: form.guestCount,
      cannotAttend: form.cannotAttend,
      submittedAt: new Date().toISOString(),
      source: "graduation_invitation",
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
          guestCount: String(payload.guestCount),
          cannotAttend: String(payload.cannotAttend),
          submittedAt: String(payload.submittedAt),
          source: String(payload.source),
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
        <p className="final-tagline">See you at graduation.</p>

        <form className="rsvp-card" onSubmit={handleSubmit}>
          <div className="rsvp-field-wrap rsvp-field-wrap--name">
            <label className="rsvp-label" htmlFor="guest-name">Tên của bạn</label>
            <div className="rsvp-field rsvp-field--name">
              <span className="rsvp-icon" aria-hidden="true">
                <MailCheck size={18} />
              </span>
              <input
                id="guest-name"
                type="text"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder={guestName ? `Nhập tên của bạn` : "Tên của bạn"}
                aria-label="Tên của bạn"
                required
              />
            </div>
          </div>

          <div className="rsvp-field-wrap rsvp-field-wrap--count">
            <label className="rsvp-label" htmlFor="guest-count">Số lượng khách</label>
            <div className="rsvp-field rsvp-field--count">
              <span className="rsvp-icon" aria-hidden="true">
                <MailCheck size={18} />
              </span>
              <select
                id="guest-count"
                value={form.guestCount}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    guestCount: Number(event.target.value),
                  }))
                }
                aria-label="Số lượng khách"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="rsvp-submit-button" disabled={isSubmitting} aria-busy={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="rsvp-spinner" aria-hidden="true" />
                <span>Đang gửi...</span>
              </>
            ) : (
              <>
                <MailCheck size={18} />
                {submitted ? "Đã xác nhận" : "Xác nhận tham dự"}
              </>
            )}
          </button>

          <label className="rsvp-checkbox-row">
            <input
              type="checkbox"
              checked={form.cannotAttend}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  cannotAttend: event.target.checked,
                }))
              }
            />
            <span>Tôi không thể tham dự</span>
          </label>
        </form>

        {submitError ? <p className="rsvp-message rsvp-message--error">{submitError}</p> : null}
        {submitted ? (
          <p className="rsvp-message rsvp-message--success">Xác nhận thành công! Cảm ơn bạn đã phản hồi.</p>
        ) : (
          <p className="rsvp-status">{statusText}</p>
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
