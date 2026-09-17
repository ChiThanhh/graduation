import { graduationConfig } from "../data/graduation"


export function Footer() {
  return (
    <footer className="site-footer">
      <p>Made with ♡ by {graduationConfig.graduateName}</p>
      <p>Graduation 2026</p>
    </footer>
  )
}
