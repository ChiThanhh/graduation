import { Music2, Volume2, VolumeX } from "lucide-react"
import { useRef, useState } from "react"

const MUSIC_SRC = "/music/background.mp3"

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isUnavailable, setIsUnavailable] = useState(false)

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio || isUnavailable) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    try {
      audio.volume = 0.10
      await audio.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
      setIsUnavailable(true)
    }
  }

  return (
    <div className="music-control">
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        loop
        preload="metadata"
        onError={() => {
          setIsPlaying(false)
          setIsUnavailable(true)
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      <button
        type="button"
        className={isPlaying ? "music-button music-button--playing" : "music-button"}
        onClick={toggleMusic}
        disabled={isUnavailable}
        aria-pressed={isPlaying}
        aria-label={
          isUnavailable ? "Chưa có file nhạc" : isPlaying ? "Tắt nhạc" : "Bật nhạc"
        }
        title={isUnavailable ? "Đặt nhạc tại public/music/background.mp3" : "Bật/tắt nhạc"}
      >
        <span aria-hidden="true" className="music-button__icon">
          {isUnavailable ? <Music2 size={20} /> : isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </span>
        <span>{isUnavailable ? "Chưa có nhạc" : isPlaying ? "Đang phát" : "Bật nhạc"}</span>
      </button>
    </div>
  )
}
