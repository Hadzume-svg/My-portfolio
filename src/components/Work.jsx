import { useState } from "react";
import projects from "../data/projects.js";

const filters = [
  { key: "all", label: "Все" },
  { key: "design", label: "Дизайн" },
  { key: "frontend", label: "Frontend" },
  { key: "bot", label: "Боты" },
];

export default function Work() {
  const [active, setActive] = useState("all");
  const visible =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="section-num mono">02 — Портфолио</span>
            <h2 className="serif">Избранные работы</h2>
          </div>
        </div>

        <div className="filters">
          {filters.map((f) => (
            <button
              key={f.key}
              className={"filter-btn" + (active === f.key ? " active" : "")}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid">
          {visible.map((p) => (
            <div className="project" key={p.id}>
              <div className="project-thumb">
                {p.image ? (
                  <img src={p.image} alt={p.title} />
                ) : (
                  <span>[ превью / скриншот ]</span>
                )}
              </div>
              <div className="project-body">
                <span className="cat mono">{p.categoryLabel}</span>
                <h4 className="serif">{p.title}</h4>
                <p>{p.description}</p>
                <a href={p.link} target="_blank" rel="noreferrer">
                  {p.linkLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
