import { Polaroid } from "./ui/Polaroid"
import { Reveal } from "./ui/Reveal"
import { SectionHeading } from "./ui/SectionHeading"
import { Sticker } from "./ui/Sticker"

const galleryPhotos = [
  {
    src: "/image/2.jpg",
    alt: "Graduation photo placeholder 1",
    caption: "Đâyyy dòiiiii",
    rotate: "-3deg",
  },
  {
    src: "/image/3.jpg",
    alt: "Graduation photo placeholder 2",
    caption: "Áaaaaaaaaaaaaaaaa",
    rotate: "2deg",
  },
]

export function PhotoGallery() {
  return (
    <section className="story-section photo-gallery-section" aria-labelledby="photo-gallery-title">
      <div className="section-inner">
        <Reveal>
          <SectionHeading eyebrow="photo corner" title="Một góc nhỏ để giữ vài tấm ảnh">
          </SectionHeading>
        </Reveal>

        <div className="photo-gallery">
          {galleryPhotos.map((photo, index) => (
            <Reveal className="gallery-photo" key={photo.src} delay={index * 0.08}>
              <Sticker className={`gallery-tape gallery-tape--${index + 1}`}> </Sticker>
              <Polaroid
                src={photo.src}
                alt={photo.alt}
                caption={photo.caption}
                rotate={photo.rotate}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
