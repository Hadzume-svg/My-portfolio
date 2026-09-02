import { usePortfolio } from "../store.jsx";

const handle = (url) => {
  try {
    return url.split("/").filter(Boolean).pop() || "";
  } catch {
    return "";
  }
};

export default function Footer() {
  const { data, t } = usePortfolio();
  const profile = data.profile;
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <a href="#top" className="logo serif">
              StackOne
              <span className="dotk" />
            </a>
            <p>{t("footer.line")}</p>
          </div>

          <div className="foot-contacts">
            {profile.links.telegram && (
              <a
                className="f-link"
                href={profile.links.telegram}
                target="_blank"
                rel="noreferrer"
              >
                Telegram <span className="hint mono">@{handle(profile.links.telegram)}</span>
                <span className="arr">↗</span>
              </a>
            )}
            {profile.links.discord && (
              <a
                className="f-link"
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
              >
                Discord <span className="hint mono">{profile.links.discord}</span>
                <span className="arr">↗</span>
              </a>
            )}
            {profile.links.github && (
              <a
                className="f-link"
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub <span className="hint mono">@{handle(profile.links.github)}</span>
                <span className="arr">↗</span>
              </a>
            )}
            {profile.links.instagram && (
              <a
                className="f-link"
                href={profile.links.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Instagram <span className="hint mono">@{handle(profile.links.instagram)}</span>
                <span className="arr">↗</span>
              </a>
            )}
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 StackOne · David. {t("footer.rights")}.</span>
          <div className="foot-right">
            <a className="back" href="#top">
              {t("footer.up")}
            </a>
            <a className="foot-admin mono" href="#admin" title="Админ">
              ⚙
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}