import { ExternalLink, MapPin } from "lucide-react"
import { graduationConfig } from "../data/graduation"
import { Reveal } from "./ui/Reveal"
import { SectionHeading } from "./ui/SectionHeading"

export function Location() {
  return (
    <section className="story-section location-section" aria-labelledby="location-title">
      <div className="section-inner location-grid">
        <Reveal>
          <SectionHeading eyebrow="meet me" title="See you here!" align="left">
            <p>Em sẽ chờ bạn ở đây, nhớ tới chụp hình với em nha.</p>
          </SectionHeading>
          <div className="location-copy">
            <h3>{graduationConfig.locationName}</h3>
            <p>{graduationConfig.locationAddress}</p>
            <a
              className="map-button"
              href={graduationConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin size={18} />
              Mở Google Maps
              <ExternalLink size={16} />
            </a>
          </div>
        </Reveal>

        <Reveal className="map-card real-map-card" delay={0.12}>
          <iframe
            src={graduationConfig.googleMapsEmbedUrl}
            title={`Bản đồ ${graduationConfig.locationName}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Reveal>
      </div>
    </section>
  )
}
