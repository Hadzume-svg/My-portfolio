import { usePortfolio } from "../store.jsx";

export default function Hero() {
  const { data, t, tr } = usePortfolio();
  const profile = data.profile;

  return (
    <section className="hero wrap" id="top">
      <div className="orb" aria-hidden="true" />

      <div className="hero-grid">
        <div>
          <div className="hero-eyebrow mono">
            <span className="dot" />
            {tr(profile.role)}
          </div>

          <h1>
            {t("hero.title1")}{" "}
            <span className="accent">{t("hero.title2")}</span>
          </h1>

          <p className="hero-lead">{tr(profile.tagline)}</p>

          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">
              {t("hero.works")}
            </a>
            <a href="#contact" className="btn btn-secondary">
              {t("hero.talk")}
            </a>
          </div>
        </div>

        <aside className="hero-meta">
          <div className="m-item">
            <span className="m-label mono">{t("meta.status")}</span>
            <span className="m-value available">● {tr(profile.status)}</span>
          </div>
          <div className="m-item">
            <span className="m-label mono">{t("meta.experience")}</span>
            <span className="m-value">{tr(profile.experience)}</span>
          </div>
          <div className="m-item">
            <span className="m-label mono">{t("meta.active")}</span>
            <span className="m-value">{profile.activeProjects}</span>
          </div>
          <div className="m-item">
            <span className="m-label mono">{t("meta.stack")}</span>
            <span className="m-value">
              {profile.stack.slice(0, 4).join(" · ")}
            </span>
          </div>
          <div className="m-item">
            <span className="m-label mono">{t("meta.answer")}</span>
            <span className="m-value">{tr(profile.answerTime)}</span>
          </div>
        </aside>
      </div>

      <div className="hero-chips">
        {profile.stack.map((s, i) => (
          <span className="chip" style={{ "--i": i }} key={s}>
            {s}
          </span>
        ))}
      </div>

      <a href="#services" className="scroll-hint" aria-label="Вниз">
        ↓
      </a>
    </section>
  );
}