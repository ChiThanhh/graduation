import { graduationConfig } from "../data/graduation"

type FooterProps = {
  onResetName: () => void
}

export function Footer({ onResetName }: FooterProps) {
  return (
    <footer className="site-footer">
      <p>Made with ♡ by {graduationConfig.graduateName}</p>
      <p>Graduation 2026</p>
      <button type="button" onClick={onResetName}>
        Reset name
      </button>
    </footer>
  )
}
