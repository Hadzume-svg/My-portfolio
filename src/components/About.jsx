import profile from "../data/profile.js";

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="section-num mono">03 — Обо мне</span>
            <h2 className="serif">Коротко о процессе</h2>
          </div>
        </div>
        <div className="about-grid">
          <div>
            <p>{profile.about}</p>
          </div>
          <div className="stats">
            {profile.stats.map((s) => (
              <div className="stat" key={s.l}>
                <div className="n serif">{s.n}</div>
                <div className="l mono">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
