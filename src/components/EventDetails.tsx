import { CalendarDays, Clock, MapPin } from "lucide-react"
import { graduationConfig } from "../data/graduation"
import { Countdown } from "./Countdown"
import { Reveal } from "./ui/Reveal"
import { SectionHeading } from "./ui/SectionHeading"

const eventCards = [
  {
    label: "Ngày",
    value: graduationConfig.displayDate,
    icon: CalendarDays,
  },
  {
    label: "Thời gian",
    value: graduationConfig.time,
    icon: Clock,
  },
  {
    label: "Địa điểm",
    value: graduationConfig.locationName,
    icon: MapPin,
  },
]

export function EventDetails() {
  return (
    <section className="story-section event-section" aria-labelledby="event-title">
      <div className="section-inner">
        <Reveal>
          <SectionHeading eyebrow="save this" title="Save the date ♡">
            <p>Để dành một góc lịch cho em nha.</p>
          </SectionHeading>
        </Reveal>

        <div className="event-cards">
          {eventCards.map(({ label, value, icon: Icon }, index) => (
            <Reveal className="event-card" key={label} delay={index * 0.06}>
              <Icon size={26} aria-hidden="true" />
              <span>{label}</span>
              <strong>{value}</strong>
            </Reveal>
          ))}
        </div>

        <Reveal className="countdown-panel">
          <p>Counting down to my big day ♡</p>
          <Countdown />
        </Reveal>
      </div>
    </section>
  )
}
