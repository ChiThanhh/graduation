import type { CSSProperties } from "react"
import { useState } from "react"

type PolaroidProps = {
  src: string
  alt: string
  caption: string
  rotate?: string
  priority?: boolean
}

export function Polaroid({
  src,
  alt,
  caption,
  rotate = "-2deg",
  priority = false,
}: PolaroidProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const hasError = failedSrc === src

  return (
    <figure className="polaroid" style={{ "--rotate": rotate } as CSSProperties}>
      <div className="polaroid__image">
        {hasError ? (
          <div className="photo-placeholder">
            <span>Your photo here</span>
            <small>♡</small>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            onError={() => setFailedSrc(src)}
          />
        )}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
