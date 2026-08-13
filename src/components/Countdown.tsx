import { graduationConfig } from "../data/graduation"
import { useCountdown } from "../hooks/useCountdown"

const pad = (value: number) => value.toString().padStart(2, "0")

export function Countdown() {
  const countdown = useCountdown(graduationConfig.date, graduationConfig.time)

  if (countdown.isTodayOrPast) {
    return <p className="countdown-done">The big day is here ♡</p>
  }

  const parts = [
    ["Days", countdown.days],
    ["Hours", countdown.hours],
    ["Minutes", countdown.minutes],
    ["Seconds", countdown.seconds],
  ] as const

  return (
    <div className="countdown-grid" aria-label="Countdown to graduation day">
      {parts.map(([label, value]) => (
        <div className="countdown-item" key={label}>
          <strong>{pad(value)}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}
