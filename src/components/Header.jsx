import { useState, useEffect } from "react";
import { usePortfolio } from "../store.jsx";
import { LANGS } from "../i18n.js";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, lang, setLang } = usePortfolio();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [langOpen]);

  return (
    <header className={"header" + (scrolled ? " scrolled" : "")}>
      <nav className="wrap header-nav">
        <a href="#top" className="logo serif">
          David — Portfolio
          <span className="dotk" />
        </a>
        <div className="nav-links">
          <a href="#services">{t("nav.services")}</a>
          <a href="#about">{t("nav.about")}</a>
          <a href="#work">{t("nav.work")}</a>
        </div>
        <div className="header-right">
          <div className="lang-wrap" onClick={(e) => e.stopPropagation()}>
            <button
              className="lang-switch mono"
              onClick={() => setLangOpen((v) => !v)}
              aria-label="Language"
            >
              {lang.toUpperCase()}
            </button>
            {langOpen && (
              <div className="lang-menu">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    className={"mono" + (lang === l.code ? " active" : "")}
                    onClick={() => {
                      setLang(l.code);
                      setLangOpen(false);
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <a className="nav-cta" href="#contact">
            {t("nav.cta")} ↗
          </a>
        </div>
      </nav>
    </header>
  );
}