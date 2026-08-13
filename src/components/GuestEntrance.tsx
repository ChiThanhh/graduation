import type { FormEvent } from "react"
import { useMemo, useRef, useState } from "react"
import { Mail, Sparkles } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { Sticker } from "./ui/Sticker"

type GuestEntranceProps = {
  onSubmit: (name: string) => void
}

export function GuestEntrance({ onSubmit }: GuestEntranceProps) {
  const [name, setName] = useState("")
  const [isOpening, setIsOpening] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const reduceMotion = useReducedMotion()
  const trimmedName = useMemo(() => name.trim(), [name])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!trimmedName) {
      inputRef.current?.focus()
      return
    }

    setIsOpening(true)
    window.setTimeout(
      () => {
        onSubmit(trimmedName.slice(0, 50))
        window.scrollTo({ top: 0, behavior: "auto" })
      },
      reduceMotion ? 0 : 760,
    )
  }

  return (
    <motion.section
      className="entrance"
      aria-labelledby="entrance-title"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45 }}
    >
      <div className="floating-decor" aria-hidden="true">
        <Sticker className="decor decor--one">♡</Sticker>
        <Sticker className="decor decor--two" delay={0.6}>✦</Sticker>
        <Sticker className="decor decor--three" delay={1.1}>☆</Sticker>
      </div>

      <motion.form
        className="entrance-card"
        onSubmit={handleSubmit}
        initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
        animate={
          reduceMotion
            ? undefined
            : isOpening
              ? { opacity: 0, y: -12, scale: 1.02 }
              : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: isOpening ? 0.6 : 0.7, ease: "easeOut" }}
      >
        <span className="mail-badge" aria-hidden="true">
          <Mail size={34} />
        </span>
        <p className="entrance-kicker">Hey there!</p>
        <h1 id="entrance-title">Trước khi mở thư...</h1>
        <p>Em có thể gọi anh/chị là gì haaaaa ♡</p>

        <label className="sr-only" htmlFor="guest-name">
          Nhập họ tên
        </label>
        <input
          ref={inputRef}
          id="guest-name"
          value={name}
          autoFocus
          maxLength={50}
          placeholder="Nhập họ tên..."
          onChange={(event) => setName(event.target.value)}
        />

        <button type="submit" disabled={!trimmedName || isOpening}>
          <Sparkles size={18} />
          {isOpening ? `Thư dành cho ${trimmedName} ♡` : "Mở thư"}
        </button>
      </motion.form>
    </motion.section>
  )
}
