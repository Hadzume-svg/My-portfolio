import profile from "../data/profile.js";

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="section-num mono">01 — Услуги</span>
            <h2 className="serif">Что я делаю</h2>
          </div>
        </div>
        <div className="services">
          {profile.services.map((s) => (
            <div className="service-card" key={s.title}>
              <span className="num mono">{s.tag}</span>
              <h3 className="serif">{s.title}</h3>
              <p>{s.text}</p>
              <ul>
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
