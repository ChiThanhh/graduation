import { graduationConfig } from "../data/graduation"
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
            <p className="letter-date">a little note</p>
            <h2 id="invitation-title">
              Dear <span className="name-underline">{guestName}</span>,
            </h2>

            <div className="letter-body">
              <p>
                Sau một hành trình thật dài,
                <br />
                cuối cùng mình cũng đã đến ngày tốt nghiệp.
              </p>
              <p>
                Và trong ngày đặc biệt này,
                <br />
                mình thật sự rất muốn{" "}
                <span className="name-underline name-underline--inline">{guestName}</span> có mặt.
              </p>
              <p>Không cần món quà gì đâu.</p>
              <p>
                Chỉ cần bạn đến,
                <br />
                chụp với mình vài tấm hình,
                <br />
                và cùng mình giữ lại một chút kỷ niệm
                <br />
                là đủ rồi ♡
              </p>
            </div>

            <p className="letter-signature">
              With love,
              <br />
              <strong>{graduationConfig.graduateName} ♡</strong>
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
