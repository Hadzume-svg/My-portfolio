import useReveal from "../hooks/useReveal.js";
import { usePortfolio } from "../store.jsx";

export default function Contact() {
  useReveal();
  const { data, t } = usePortfolio();
  const profile = data.profile;

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="contact-grid">
          <div className="reveal">
            <span className="eyebrow mono">{t("contact.label")}</span>
            <h2>
              {t("contact.title")}
              <span className="accent">{t("contact.accent")}</span>
            </h2>
            <p className="sub">{t("contact.sub")}</p>
          </div>

          <div className="contact-links reveal reveal-delay-1">
            {profile.links.telegram && (
              <a
                className="c-link solid"
                href={profile.links.telegram}
                target="_blank"
                rel="noreferrer"
              >
                {t("contact.telegram")} <span className="arr">↗</span>
              </a>
            )}
            {profile.links.github && (
              <a
                className="c-link"
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
              >
                {t("contact.github")} <span className="arr">↗</span>
              </a>
            )}
            {profile.links.instagram && (
              <a
                className="c-link"
                href={profile.links.instagram}
                target="_blank"
                rel="noreferrer"
              >
                {t("contact.instagram")} <span className="arr">↗</span>
              </a>
            )}
            {profile.links.discord && (
              <span className="c-link">
                {t("contact.discord")} · {profile.links.discord}{" "}
                <span className="arr">·</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}