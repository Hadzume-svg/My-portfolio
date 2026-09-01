import profile from "../data/profile.js";

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <span className="section-num mono">04 — Контакты</span>
        <h2 className="serif">
          Есть задача по сайту, боту или дизайну?
          <br />
          Расскажи — обсудим детали.
        </h2>
        <div className="contact-links">
          <a
            className="btn btn-primary"
            href={profile.links.telegram}
            target="_blank"
            rel="noreferrer"
          >
            Написать в Telegram
          </a>
          <a
            className="btn btn-secondary"
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="btn btn-secondary"
            href={profile.links.instagram}
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <span className="btn btn-secondary socials-static">
            Discord: {profile.links.discord}
          </span>
        </div>
      </div>
    </section>
  );
}
