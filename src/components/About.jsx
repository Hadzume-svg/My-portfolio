import useReveal from "../hooks/useReveal.js";
import { usePortfolio } from "../store.jsx";

export default function About() {
  useReveal();
  const { data, t, tr } = usePortfolio();
  const profile = data.profile;

  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <span className="section-label mono">{t("about.label")}</span>
            <h2>{t("about.title")}</h2>
          </div>
        </div>

        <div className="about-grid">
          <div className="about-photo-frame reveal">
            <img src={profile.photo} alt={profile.name} className="about-photo" loading="lazy" decoding="async" />
            <div className="about-photo-cap mono">
              <span>© {profile.name}</span>
              <span className="tag">{t("about.cap")}</span>
            </div>
          </div>

          <div className="reveal reveal-delay-1">
            <p className="about-statement">
              {tr(profile.about)}
            </p>
            <div className="about-stats">
              {profile.stats.map((s) => (
                <div className="stat" key={s.l}>
                  <div className="n">{s.n}</div>
                  <div className="l mono">{tr(s.l)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}