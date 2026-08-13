import { graduationConfig } from "../data/graduation"
import { Polaroid } from "./ui/Polaroid"
import { Reveal } from "./ui/Reveal"
import { Sticker } from "./ui/Sticker"

type PersonalInvitationProps = {
  guestName: string
}

export function PersonalInvitation({ guestName }: PersonalInvitationProps) {
  return (
    <section className="story-section invitation-section" aria-labelledby="invitation-title">
      <div className="section-inner invitation-wrap">
        <Reveal>
          <article className="letter-card">
            <Sticker className="letter-heart">♡</Sticker>
            <div className="letter-content">
              <p className="letter-date">a little note</p>
              <h2 id="invitation-title">
                Dear <span className="name-underline">{guestName}</span>
              </h2>

              <div className="letter-body">
                <p>
                  Sau một hành trình thật dài,
                  <br />
                  cuối cùng em cũng đã đến ngày tốt nghiệp.
                </p>
                <p>
                  Và trong ngày đặc biệt này,
                  <br />
                  em thật sự rất muốn{" "}
                  <span className="name-underline name-underline--inline">{guestName}</span> có mặt.
                </p>
                <p>Không cần món quà gì đâu.</p>
                <p>
                  Chỉ cần anh/chị đến,
                  <br />
                  chụp với em vài tấm hình,
                  <br />
                  và cùng em giữ lại một chút kỷ niệm
                  <br />
                  là đủ rồi ♡
                </p>
              </div>

              <p className="letter-signature">
                With love,
                <br />
                <strong>{graduationConfig.graduateName} ♡</strong>
              </p>
            </div>

            <div className="letter-photo-stack" aria-label="Graduation photos">
              <Sticker className="letter-photo-tape letter-photo-tape--one"> </Sticker>
              <div className="letter-photo letter-photo--one">
                <Polaroid
                  src="/image/4.png"
                  alt="Graduation photo 1"
                  caption="sweet memory"
                  rotate="-5deg"
                />
              </div>
              <Sticker className="letter-photo-tape letter-photo-tape--two"> </Sticker>
              <div className="letter-photo letter-photo--two">
                <Polaroid
                  src="/image/5.png"
                  alt="Graduation photo 2"
                  caption="little joy"
                  rotate="4deg"
                />
              </div>
              <Sticker className="letter-photo-tape letter-photo-tape--three"> </Sticker>
              <div className="letter-photo letter-photo--three">
                <Polaroid
                  src="/image/6.png"
                  alt="Graduation photo 3"
                  caption="see you there"
                  rotate="-3deg"
                />
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
