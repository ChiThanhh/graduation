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
    name: guestName,
    guestCount: 1,
    cannotAttend: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const statusText = useMemo(() => {
    if (submitted) return "Cảm ơn bạn đã phản hồi!"
    return "Tôi sẽ chờ bạn ở đó ✨"
  }, [submitted])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload = {
      guestName: form.name.trim() || guestName,
      guestCount: form.guestCount,
      cannotAttend: form.cannotAttend,
      submittedAt: new Date().toISOString(),
      source: "graduation_invitation",
    }

    try {
      window.localStorage.setItem("graduation_rsvp", JSON.stringify(payload))
    } catch {
      // no-op: storage may be unavailable
    }

    if (appConfig.googleSheetEndpoint) {
      try {
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
      } catch (error) {
        console.error("Failed to submit RSVP to Google Sheet:", error)
        return
      }
    }

    console.log("RSVP submitted:", payload)
    setSubmitted(true)
  }

  return (
    <section className="story-section final-section" aria-labelledby="final-title">
      <Reveal className="final-card">
        <p className="final-english">LET&apos;S CELEBRATE!</p>
        <p className="final-tagline">Thank you for being part of my journey.</p>
        <p className="final-tagline">See you at graduation.</p>

        <form className="rsvp-card" onSubmit={handleSubmit}>
          <div className="rsvp-field rsvp-field--name">
            <span className="rsvp-icon" aria-hidden="true">
              <MailCheck size={18} />
            </span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Tên của bạn"
              aria-label="Tên của bạn"
            />
          </div>

          <div className="rsvp-field rsvp-field--count">
            <span className="rsvp-icon" aria-hidden="true">
              <MailCheck size={18} />
            </span>
            <select
              value={form.guestCount}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  guestCount: Number(event.target.value),
                }))
              }
              aria-label="Số lượng khách"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="rsvp-submit-button">
            <MailCheck size={18} />
            {submitted ? "Đã xác nhận" : "Xác nhận tham dự"}
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

        <p className="rsvp-status">{statusText}</p>

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
