import { useState } from "react";
import useReveal from "../hooks/useReveal.js";
import { usePortfolio } from "../store.jsx";

export default function Work() {
  useReveal();
  const [active, setActive] = useState("all");
  const { data, t, tr } = usePortfolio();
  const categories = data.profile.categories || [];
  const projects = data.projects || [];

  const visible =
    active === "all"
      ? projects
      : active === "featured"
      ? projects.filter((p) => p.featured)
      : projects.filter((p) => p.category === active);

  const filters = [
    { key: "all", label: null },
    { key: "featured", label: t("work.featured") },
    ...categories.map((c) => ({ key: c.key, label: c.label })),
  ];

  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <span className="section-label mono">{t("work.label")}</span>
            <h2>{t("work.title")}</h2>
          </div>
          <p className="sub">{t("work.sub")}</p>
        </div>

        {filters.length > 1 && (
          <div className="filters reveal">
            {filters.map((f) => (
              <button
                key={f.key}
                className={"filter-btn" + (active === f.key ? " active" : "")}
                onClick={() => setActive(f.key)}
              >
                {f.label || t("work.all")}
              </button>
            ))}
          </div>
        )}

        <div className="w-list">
          {visible.map((p) => (
            <article className="w-row reveal" key={p.id}>
              <div>
                <span className="cat mono">{tr(p.categoryLabel)}</span>
                <h3>{tr(p.title)}</h3>
                <p className="desc">{tr(p.description)}</p>
                <a className="more" href={p.link} target="_blank" rel="noreferrer">
                  {tr(p.linkLabel)} <span className="arrow">→</span>
                </a>
              </div>
              <div className="w-thumb">
                {p.image ? (
                  <img src={p.image} alt={p.title} loading="lazy" decoding="async" />
                ) : (
                  <span className="ph">✦</span>
                )}
              </div>
            </article>
          ))}
        </div>
        {visible.length === 0 && (
          <p className="w-empty mono">
            {t("work.empty")}
          </p>
        )}
      </div>
    </section>
  );
}
