import { useCallback, useMemo, useState } from "react"

const STORAGE_KEY = "graduation_guest_name"

const cleanName = (name: string) => name.trim().slice(0, 50)

export function useGuestName() {
  const [guestName, setGuestNameState] = useState(() => {
    if (typeof window === "undefined") return ""

    try {
      const savedName = window.localStorage.getItem(STORAGE_KEY)
      return savedName ? cleanName(savedName) : ""
    } catch {
      return ""
    }
  })

  const setGuestName = useCallback((name: string) => {
    const nextName = cleanName(name)
    if (!nextName) return

    setGuestNameState(nextName)
    try {
      window.localStorage.setItem(STORAGE_KEY, nextName)
    } catch {
      // The invitation still works if storage is unavailable.
    }
  }, [])

  const clearGuestName = useCallback(() => {
    setGuestNameState("")
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Nothing to clean up if storage is unavailable.
    }
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])

  return useMemo(
    () => ({
      guestName,
      setGuestName,
      clearGuestName,
      hasGuest: guestName.length > 0,
    }),
    [clearGuestName, guestName, setGuestName],
  )
}
