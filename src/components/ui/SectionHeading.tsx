import type { ReactNode } from "react"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  children?: ReactNode
  align?: "center" | "left"
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {children ? <div className="section-copy">{children}</div> : null}
    </div>
  )
}
