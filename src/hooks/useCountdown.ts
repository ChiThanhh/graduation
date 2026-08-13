import { useEffect, useMemo, useState } from "react"

type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
  isTodayOrPast: boolean
}

const getTargetDate = (date: string, time: string) => new Date(`${date}T${time}:00`)

const getCountdown = (date: string, time: string): CountdownParts => {
  const target = getTargetDate(date, time).getTime()
  const difference = Math.max(target - Date.now(), 0)

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isTodayOrPast: difference === 0,
  }
}

export function useCountdown(date: string, time: string) {
  const [parts, setParts] = useState(() => getCountdown(date, time))

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setParts(getCountdown(date, time))
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [date, time])

  return useMemo(() => parts, [parts])
}
