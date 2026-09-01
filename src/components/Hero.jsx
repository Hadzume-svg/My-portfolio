import profile from "../data/profile.js";

export default function Hero() {
  return (
    <section className="hero wrap" id="top">
      <div className="hero-text">
        <div className="eyebrow mono">
          frontend · telegram/discord bots · product design
        </div>
        <h1 className="serif">
          Привет, я {profile.name} —{" "}
          <em>{profile.tagline.charAt(0).toLowerCase() + profile.tagline.slice(1)}</em>
        </h1>
        <p>{profile.intro}</p>

        <div className="stack-chips">
          {profile.stack.map((s) => (
            <span className="chip mono" key={s}>
              {s}
            </span>
          ))}
        </div>

        <div className="hero-actions">
          <a href="#work" className="btn btn-primary">
            Смотреть работы
          </a>
          <a href="#contact" className="btn btn-secondary">
            Обсудить проект
          </a>
        </div>

        <div className="hero-socials mono">
          <a href={profile.links.telegram} target="_blank" rel="noreferrer">
            Telegram
          </a>
          <a href={profile.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.links.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <span className="socials-static">Discord: {profile.links.discord}</span>
        </div>
      </div>

      <div className="hero-photo-frame">
        <img src={profile.photo} alt={profile.name} className="hero-photo" />
        <div className="hero-photo-tag mono">
          {profile.name} — frontend / bots / design
        </div>
      </div>
    </section>
  );
}
