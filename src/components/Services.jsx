import { useState } from "react";
import useReveal from "../hooks/useReveal.js";
import { usePortfolio } from "../store.jsx";

export default function Services() {
  useReveal();
  const [open, setOpen] = useState(null);
  const { data, t, tr } = usePortfolio();
  const services = data.profile.services;

  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <span className="section-label mono">{t("service.label")}</span>
            <h2>{t("service.title")}</h2>
          </div>
          <p className="sub">{t("service.sub")}</p>
        </div>

        <div className="services-list">
          {services.map((s, i) => {
            const isOpen = open === i;
            return (
              <details
                className={"s-item" + (isOpen ? " open" : "")}
                key={s.title}
                open={isOpen}
                onToggle={(e) => {
                  if (e.target.open) setOpen(i);
                  else setOpen((o) => (o === i ? null : o));
                }}
              >
                <summary className="s-sum">
                  <span className="s-ico">{s.icon}</span>
                  <span className="s-heading">
                    <span className="s-tag mono">{tr(s.tag)}</span>
                    <span className="s-title">{tr(s.title)}</span>
                    <span className="s-text">{tr(s.text)}</span>
                  </span>
                  <span className="s-arr">→</span>
                </summary>

                <div className="s-panel">
                  <div className="s-panel-grid">
                    <div className="s-col">
                      <span className="s-col-label mono">{t("service.how")}</span>
                      <ol className="s-steps">
                        {s.how.map((h) => (
                          <li key={h}>{tr(h)}</li>
                        ))}
                      </ol>
                    </div>
                    <div className="s-col">
                      <span className="s-col-label mono">
                        {t("service.where")}
                      </span>
                      <ul className="s-places">
                        {s.where.map((w) => (
                          <li key={w}>{tr(w)}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}