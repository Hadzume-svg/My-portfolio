import profile from "../data/profile.js";

export default function Header() {
  return (
    <header className="header">
      <nav className="wrap header-nav">
        <a href="#top" className="logo">
          {profile.name}
          <span>.</span>
        </a>
        <div className="nav-links">
          <a href="#work">Работы</a>
          <a href="#services">Услуги</a>
          <a href="#about">Обо мне</a>
        </div>
        <a className="nav-cta" href="#contact">
          Написать →
        </a>
      </nav>
    </header>
  );
}
